const models = require("../models");

class CamerasController {
  static browse = (req, res) => {
    models.cameras
      .findAll()
      .then((cameras) => res.send(cameras))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.cameras
      .find(req.params.id)
      .then((camera) => {
        if (camera.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(camera);
        }
      })

      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const newCamera = req.body;
    const authorized = true;

    if (authorized) {
      const validateErrors = models.cameras.validate(newCamera);
      if (validateErrors) {
        console.error(validateErrors);
        return res.status(422).json({ validateErrors });
      }

      models.cameras
        .insert({ ...newCamera })
        .then(([result]) => {
          res.status(201).send({ ...newCamera, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else res.sendStatus(403);
    return true;
  };

  static modify = async (req, res) => {
    const newCamera = req.body;
    const authorized = true;

    if (authorized) {
      const validationErrors = models.cameras.validate(newCamera, false);
      if (validationErrors) res.status(422).json({ validationErrors });
      else {
        models.cameras
          .update(newCamera, req.params.id)
          .then(([result]) => {
            if (result.affectedRows === 0)
              throw new Error("No change affected");
            delete newCamera.password_hash;
            res.status(201).send({ ...newCamera });
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    } else res.sendStatus(403);
  };

  static delete = async (req, res) => {
    const authorized = true;

    if (authorized) {
      models.cameras
        .delete(req.params.id)
        .then(() => {
          res.sendStatus(204);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else res.sendStatus(403);
  };
}

module.exports = CamerasController;
