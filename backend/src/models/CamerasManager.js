const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class CamerasManager extends AbstractManager {
  static table = "cameras";

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      marque: Joi.string().max(100).presence(this.presence),
      modele: Joi.string().max(100).presence(this.presence),
      capteur: Joi.string().max(100).presence(this.presence),
      type: Joi.string().max(100).presence(this.presence),
      largeurMM: Joi.float().presence(this.presence),
      hauteurMM: Joi.float().presence(this.presence),
      largeurPx: Joi.int().presence(this.presence),
      hauteurPx: Joi.int().presence(this.presence),
      photosites: Joi.float().presence(this.presence),
      megapixels: Joi.float().presence(this.presence),
      cadence: Joi.int(),
      dynamique: Joi.int(),
      bits: Joi.string().max(100),
      bruitLecture: Joi.string().max(100),
      courantObscurite: Joi.string().max(100),
      tempsLecture: Joi.string().max(100),
      capacitePixel: Joi.int(),
      refroidissement: Joi.int(),
    };

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(camera) {
    return this.connection.query(
      `insert into ${CamerasManager.table} (title, description, date, site) values (?, ?, ?, ?)`,
      [camera.title, camera.description, camera.date, camera.site]
    );
  }

  update(camera, id) {
    return this.connection.query(
      `update ${CamerasManager.table} set ? where id = ?`,
      [camera, id]
    );
  }

  findByCameraId(camera, id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      camera,
      id,
    ]);
  }
}

module.exports = CamerasManager;
