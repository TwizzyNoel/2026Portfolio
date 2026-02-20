exports.seed = async function(knex) {
    await knex('IOT_machines').del();
    await knex('IOT_machines').insert([
      {
        machineID: 1,
        name: 'Sensor A',
        MAC_address: '00:1B:44:11:3A:B7',
        trashID: 1
      }
    ]);
  };
  