const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "users";

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      mail: Joi.string().max(45).presence(this.presence),
      password: Joi.string().max(500).presence(this.presence),
    };

    if (forCreation)
      joiObject.password = Joi.string().max(500).presence(this.presence);
    else
      joiObject.password_hash = Joi.string().max(500).presence(this.presence);

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (mail, password_hash) values (?, ?)`,
      [user.mail, user.password_hash]
    );
  }

  update(user, id) {
    return this.connection.query(
      `update ${UserManager.table} set ? where id = ?`,
      [user, id]
    );
  }

  findByUserEmail(mail) {
    return this.connection
      .query(`select * from  ${this.table} where mail = ?`, [mail])
      .then((result) => result[0]);
  }

  findByUserId(user, id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      user,
      id,
    ]);
  }
}

module.exports = UserManager;
