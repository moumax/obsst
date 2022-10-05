const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class EventsManager extends AbstractManager {
  static table = "events";

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      title: Joi.string().max(150).presence(this.presence),
      description: Joi.string().max(500).presence(this.presence),
      date: Joi.date().presence(this.presence),
      site: Joi.string().max(100).presence(this.presence),
    };

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(event) {
    return this.connection.query(
      `insert into ${EventsManager.table} (title, description, date, site) values (?, ?, ?, ?)`,
      [event.title, event.description, event.date, event.site]
    );
  }

  update(event, id) {
    return this.connection.query(
      `update ${EventsManager.table} set ? where id = ?`,
      [event, id]
    );
  }

  findByEventId(event, id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      event,
      id,
    ]);
  }
}

module.exports = EventsManager;
