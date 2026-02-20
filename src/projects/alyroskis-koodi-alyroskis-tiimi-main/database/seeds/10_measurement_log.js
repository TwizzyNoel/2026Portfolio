exports.seed = async function(knex) {
    await knex('measurement_log').del();
    await knex('measurement_log').insert([
      {
        measurementID: 1,
        dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        machineID: 1,
        measurement_value: 65,
        battery_percentage: 88
      }
    ]);
  };
  