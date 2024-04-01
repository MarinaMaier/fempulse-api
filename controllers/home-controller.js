const knex = require("knex")(require("../knexfile"));

const index = async (req, res) => {
    try {
      const events = await knex("events")
      .select(
        "events.id",
        "events.start",
        "events.end",
        "events.title",
        "events.sub_title",
      )
      res.status(200).json(events);
    } catch (error) {
      res.status(400).send(`Error retrieving events: ${error}`);
    }
  };

  const addEvents = async (req, res) => {
    try {
      const requiredFields = [
        "start",
        "end",
        "title",
        "subTitle"
      ];
          //check if field is empty if not insert into the table
    for (const field of requiredFields) {
      if (req.body.filter(data => !data[field]).length) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }
    const { start, end, title, subTitle } = req.body;
    
    const result = await knex("events").insert(req.body);
    res.status(201).json(result);
    } catch (error) {
      res.status(400).send(`Error retrieving events: ${error}`);
    }
  };
  
  module.exports = {
    index,
    addEvents
  };