exports.seed = async function (knex) {
  await knex("user_push_tokens").del();
  await knex("user_push_tokens").insert([
    {
      userID: 1,
      expo_push_token: "ExponentPushToken[fakeToken123]",
    },
    {
      userID: 2,
      expo_push_token: "ExponentPushToken[fakeToken124]",
    },
    {
      userID: 1,
      expo_push_token: "ExponentPushToken[fakeToken125]",
    },
  ]);
};
