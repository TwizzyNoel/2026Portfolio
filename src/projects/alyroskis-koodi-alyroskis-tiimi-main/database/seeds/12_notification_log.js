exports.seed = async function (knex) {
  await knex("notification_log").del();
  await knex("notification_log").insert([
    {
      userID: 1,
      title: "Hepolamminkatu",
      body: "The trashpoint #12 is full.",
      read: true,
    },
    {
      userID: 2,
      title: "Hepolamminkatu",
      body: "The trashpoint #10 is full.",
      read: false,
    },
    {
      userID: null,
      title: "System update",
      body: "The app will undergo maintenance tonight.",
      read: false,
    },
  ]);
};
