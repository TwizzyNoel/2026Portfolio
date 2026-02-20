exports.seed = async function(knex) {
    await knex('trash_types').del();
    await knex('trash_types').insert([
      { typeID: 1, name: 'Muovi' },
      { typeID: 2, name: 'Seka' }
    ]);
  };
  