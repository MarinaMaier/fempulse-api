const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

const index = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { date } = req.params;
    const userId = jwt.decode(authorization.slice("Bearer ".length), key)?.username;
    const events = await knex("calendar_events")
      .select("calendar_events.id", "calendar_events.events")
      .where({ "calendar_events.date": date })
      .where({ "calendar_events.user_id": userId })
      .first();

    if (!events) {
      return res.status(404).json({
        error: `No events found`,
      });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(400).send(`Error retrieving events: ${error}`);
  }
};

const addEvents = async (req, res) => {
  const { authorization } = req.headers;
  const { date } = req.params;
  const { id, events } = req.body;
  try {
    const user_id = jwt.decode(authorization.slice("Bearer ".length), key)?.username;
    const requiredFields = ["start", "end", "title", "subTitle"];
    //check if field is empty if not insert into the table
    for (const field of requiredFields) {
      if (!JSON.parse(events)[0][field]) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }
    //check if event exists
    const event = await knex("calendar_events")
      .where({
        date: date,
      })
      .where({
        user_id: user_id,
      });
    if (event.length) {
      await knex("calendar_events")
        .where({
          date: date,
        })
        .where({
          user_id: user_id,
        })
        .update({
          events,
        });
      const updatedEvents = await knex("calendar_events")
        .where({
          date: date,
        })
        .where({
          user_id: user_id,
        })
        .select("id", "events")
        .first();
      return res.status(200).json(updatedEvents);
    }
    const result = await knex("calendar_events").insert({
      user_id,
      date,
      events,
    });
    const newEventsId = result[0];
    const createdEvents = await knex("calendar_events")
      .where({ id: newEventsId })
      .select("id", "events")
      .first();
    res.status(201).json(createdEvents);
  } catch (error) {
    res.status(400).send(`Error retrieving events: ${error}`);
  }
};

module.exports = {
  index,
  addEvents,
};
