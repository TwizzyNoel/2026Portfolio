exports.seed = async function(knex) {
    await knex('emptying_log').del();
    await knex('emptying_log').insert([
      { emptyingID: 1, trashID: 1, dateTime: '2025-05-01 00:00:00' }
    ]);
  };
  