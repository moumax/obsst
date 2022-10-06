const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class CamerasManager extends AbstractManager {
  static table = "cameras";

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      brand: Joi.string().max(100).presence(this.presence),
      model: Joi.string().max(100).presence(this.presence),
      sensor: Joi.string().max(100).empty(""),
      type: Joi.string().max(100).presence(this.presence),
      lengthmm: Joi.number().presence(this.presence),
      heightmm: Joi.number().presence(this.presence),
      lengthpix: Joi.number().integer().presence(this.presence),
      heightpix: Joi.number().integer().presence(this.presence),
      photosites: Joi.number().presence(this.presence),
      megapixels: Joi.number().presence(this.presence),
      cadence: Joi.number().integer(),
      dynamic: Joi.number().integer(),
      bits: Joi.string().max(100),
      readNoise: Joi.string().max(100),
      darkCurrent: Joi.string().max(100),
      readTime: Joi.string().max(100),
      capacity: Joi.number().integer(),
      cooler: Joi.number().integer(),
    };

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(camera) {
    return this.connection.query(
      `insert into ${CamerasManager.table} (brand, model, sensor, type, lengthmm, heightmm, lengthpix, heightpix, photosites, megapixels, cadence, dynamic, bits, readNoise, darkCurrent, readTime, capacity, cooler) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        camera.brand,
        camera.model,
        camera.sensor,
        camera.type,
        camera.lengthmm,
        camera.heightmm,
        camera.lengthpix,
        camera.heightpix,
        camera.photosites,
        camera.megapixels,
        camera.cadence,
        camera.dynamic,
        camera.bits,
        camera.readNoise,
        camera.darkCurrent,
        camera.readTime,
        camera.capacity,
        camera.cooler,
      ]
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
