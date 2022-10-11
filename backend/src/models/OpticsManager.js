const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class OpticsManager extends AbstractManager {
  static table = "optics";

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      brand: Joi.string().max(100).presence(this.presence),
      model: Joi.string().max(100).presence(this.presence),
      diameterMM: Joi.number().integer().presence(this.presence),
      focalMM: Joi.number().integer().presence(this.presence),
      fd: Joi.number().presence(this.presence),
      r: Joi.number().presence(this.presence),
    };

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(optic) {
    return this.connection.query(
      `insert into ${OpticsManager.table} (brand, model, diameterMM, focalMM, fd, r) values (?, ?, ?, ?, ?, ?)`,
      [
        optic.brand,
        optic.model,
        optic.diameterMM,
        optic.focalMM,
        optic.fd,
        optic.r,
      ]
    );
  }

  update(optic, id) {
    return this.connection.query(
      `update ${OpticsManager.table} set ? where id = ?`,
      [optic, id]
    );
  }

  findByCameraId(optic, id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      optic,
      id,
    ]);
  }
}

module.exports = OpticsManager;
