/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('emojis').del()
  await knex('emojis').insert([
    {id: 1, mood: 'Happy'},
    {id: 2, mood: 'Sad'},
    {id: 3, mood: 'Neutral'},
    {id: 4, mood: 'Annoyed'}
  ]);
};
