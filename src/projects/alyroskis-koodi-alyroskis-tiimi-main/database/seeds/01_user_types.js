exports.seed = async function(knex) {
    await knex('user_types').del();
    await knex('user_types').insert([
      { roleID: 1, name: 'Admin' },
      { roleID: 2, name: 'Maintenance' },
      { roleID: 3, name: 'Manager' }
    ]);
  };
  