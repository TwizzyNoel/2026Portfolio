exports.up = async function(knex) {
    await knex.raw(`
        CREATE TRIGGER update_alarm_after_insert
        AFTER INSERT ON measurement_log
        FOR EACH ROW
        BEGIN
            UPDATE smart_trash
            SET alarm_treshold = ROUND((NEW.measurement_value / smart_trash.height) * 100)
            WHERE smart_trash.trashID = NEW.measurementID;
        END;  
    `);

    await knex.raw(`
        CREATE TRIGGER update_alarm_after_update
        AFTER UPDATE ON measurement_log
        FOR EACH ROW
        BEGIN
            UPDATE smart_trash
            SET alarm_treshold = ROUND((NEW.measurement_value / smart_trash.height) * 100)
            WHERE smart_trash.trashID = NEW.measurementID;
        
        END;
    `);
};

exports.down = async function(knex) {
    await knex.raw(`DROP TRIGGER IF EXISTS update_alarm_after_insert;`);
    await knex.raw(`DROP TRIGGER IF EXISTS update_alarm_after_update;`);
};