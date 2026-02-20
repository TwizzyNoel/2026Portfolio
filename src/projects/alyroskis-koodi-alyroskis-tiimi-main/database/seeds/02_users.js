const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  await knex("users").del();
  const hashedPassword1 = await bcrypt.hash("adminpass", 10);
  const hashedPassword2 = await bcrypt.hash("maintpass", 10);
  await knex("users").insert([
    {
      userID: 1,
      user_type: 1,
      email: "admin@example.com",
      phone: "1234567890",
      password: hashedPassword1,
      fullname: "Admin User",
    },
    {
      userID: 2,
      user_type: 2,
      email: "maint@example.com",
      phone: "9876543210",
      password: hashedPassword2,
      fullname: "Maintenance Guy",
    },
    {
      userID: 3,
      user_type: 2,
      email: "maint2@example.com",
      phone: "9876543211",
      password: hashedPassword2,
      fullname: "Maintenance Guy 2",
    },
  ]);
};
