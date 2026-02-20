exports.seed = async function (knex) {
  await knex("campus").del();
  await knex("campus").insert([
    { campusID: 1, name: "Hepolammin kampus" },
    { campusID: 2, name: "Sammonkadun kampus" },
  ]);
};
