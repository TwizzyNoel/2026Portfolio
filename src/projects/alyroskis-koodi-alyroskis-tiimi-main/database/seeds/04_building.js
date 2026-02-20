exports.seed = async function (knex) {
  await knex("building").del();
  await knex("building").insert([
    { buildingID: 1, campusID: 1, name: "Rakennus L", trash_collector: true },
    { buildingID: 2, campusID: 1, name: "Rakennus B", trash_collector: true },
    { buildingID: 3, campusID: 2, name: "Rakennus A", trash_collector: true },
    { buildingID: 4, campusID: 2, name: "Rakennus B", trash_collector: true },
  ]);
};
