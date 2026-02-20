exports.up = function (knex) {
  return (
    knex.schema

      // user_types
      .createTable("user_types", (table) => {
        table.increments("roleID").primary();
        table.string("name");
      })

      // users
      .createTable("users", (table) => {
        table.increments("userID").primary();
        table
          .integer("user_type")
          .unsigned()
          .references("roleID")
          .inTable("user_types");
        table.string("email").unique();
        table.string("phone").unique();
        table.string("password");
        table.string("fullname");
      })

      // campus
      .createTable("campus", (table) => {
        table.increments("campusID").primary();
        table.string("name");
      })

      // building
      .createTable("building", (table) => {
        table.increments("buildingID").primary();
        table
          .integer("campusID")
          .unsigned()
          .references("campusID")
          .inTable("campus");
        table.string("name");
        table.boolean("trash_collector");
      })

      // maintenance_person
      .createTable("maintenance_person", (table) => {
        table.increments("maintenanceID").primary();
        table
          .integer("userID")
          .unsigned()
          .references("userID")
          .inTable("users");
        table
          .integer("buildingID")
          .unsigned()
          .references("buildingID")
          .inTable("building");
      })

      // trash_types
      .createTable("trash_types", (table) => {
        table.increments("typeID").primary();
        table.string("name");
      })

      // verification_codes
      .createTable("verification_codes", (table) => {
        table.increments("verificationCodeID").primary();
        table.string("email");
        table.string("code");
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp("expiresAt");
        table.index(["email", "code"]);
      })

      // smart_trash
      .createTable("smart_trash", (table) => {
        table.increments("trashID").primary();
        table
          .integer("trashTypeID")
          .unsigned()
          .references("typeID")
          .inTable("trash_types");
        table.decimal("longitude", 9, 6);
        table.decimal("latitude", 9, 6);
        table
          .integer("contactUserID")
          .unsigned()
          .references("userID")
          .inTable("users");
        table.string("optional_description");
        table
          .integer("building")
          .unsigned()
          .references("buildingID")
          .inTable("building");
        table.integer("height");
        table.integer("alarm_treshold");
        table.boolean("notified_80").defaultTo(false);
      })

      // emptying_log
      .createTable("emptying_log", (table) => {
        table.increments("emptyingID").primary();
        table
          .integer("trashID")
          .unsigned()
          .references("trashID")
          .inTable("smart_trash");
        table.dateTime("dateTime");
      })

      // IOT_machines
      .createTable("IOT_machines", (table) => {
        table.increments("machineID").primary();
        table.string("name");
        table.string("MAC_address");
        table
          .integer("trashID")
          .unsigned()
          .references("trashID")
          .inTable("smart_trash");
      })

      // measurement_log
      .createTable("measurement_log", (table) => {
        table.increments("measurementID").primary();
        table.dateTime("dateTime");
        table
          .integer("machineID")
          .unsigned()
          .references("machineID")
          .inTable("IOT_machines");
        table.integer("measurement_value");
        table.integer("battery_percentage");
      })

      .createTable("user_push_tokens", (table) => {
        table.increments("pushID").primary();
        table
          .integer("userID")
          .unsigned()
          .references("userID")
          .inTable("users")
          .onDelete("CASCADE");
        table.string("expo_push_token").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.unique(["userID", "expo_push_token"]);
      })

      .createTable("notification_log", (table) => {
        table.increments("notificationID").primary();
        table
          .integer("userID")
          .unsigned()
          .references("userID")
          .inTable("users")
          .onDelete("CASCADE")
          .nullable();
        table.string("title").notNullable();
        table.text("body").notNullable();
        table.boolean("read").notNullable().defaultTo(false); // default false
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("measurement_log")
    .dropTableIfExists("IOT_machines")
    .dropTableIfExists("emptying_log")
    .dropTableIfExists("user_push_tokens")
    .dropTableIfExists("smart_trash")
    .dropTableIfExists("trash_types")
    .dropTableIfExists("maintenance_person")
    .dropTableIfExists("building")
    .dropTableIfExists("campus")
    .dropTableIfExists("notification_log")
    .dropTableIfExists("users")
    .dropTableIfExists("user_types")
    .dropTableIfExists("verification_codes");
};
