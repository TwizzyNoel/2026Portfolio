exports.seed = async function (knex) {
  await knex("maintenance_person").del();
  await knex("maintenance_person").insert([
    { maintenanceID: 1, userID: 2, buildingID: 1 },
    { maintenanceID: 2, userID: 3, buildingID: 3 },
  ]);
};
