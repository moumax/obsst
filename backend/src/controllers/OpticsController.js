const models = require("../models");

class OpticsController {
  static browse = (req, res) => {
    models.optics
      .findAll()
      .then((optics) => res.send(optics))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.optics
      .find(req.params.id)
      .then((optic) => {
        if (optic.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(optic);
        }
      })

      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const newOptic = req.body;
    const authorized = true;

    if (authorized) {
      const validateErrors = models.optics.validate(newOptic);
      if (validateErrors) {
        console.error(validateErrors);
        return res.status(422).json({ validateErrors });
      }

      models.optics
        .insert({ ...newOptic })
        .then(([result]) => {
          res.status(201).send({ ...newOptic, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else res.sendStatus(403);
    return true;
  };

  static modify = async (req, res) => {
    const newOptic = req.body;
    const authorized = true;

    if (authorized) {
      const validationErrors = models.optics.validate(newOptic, false);
      if (validationErrors) res.status(422).json({ validationErrors });
      else {
        models.optics
          .update(newOptic, req.params.id)
          .then(([result]) => {
            if (result.affectedRows === 0)
              throw new Error("No change affected");
            delete newOptic.password_hash;
            res.status(201).send({ ...newOptic });
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
      models.optics
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

module.exports = OpticsController;
