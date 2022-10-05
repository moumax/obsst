const models = require("../models");

class EventsController {
  static browse = (req, res) => {
    models.events
      .findAll()
      .then((events) => res.send(events))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.events
      .find(req.params.id)
      .then((event) => {
        if (event.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(event);
        }
      })

      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const newEvent = req.body;
    const authorized = true;

    if (authorized) {
      const validateErrors = models.events.validate(newEvent);
      if (validateErrors) {
        console.error(validateErrors);
        return res.status(422).json({ validateErrors });
      }

      models.events
        .insert({ ...newEvent })
        .then(([result]) => {
          res.status(201).send({ ...newEvent, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else res.sendStatus(403);
    return true;
  };

  static modify = async (req, res) => {
    const newEvent = req.body;
    const authorized = true;

    if (authorized) {
      const validationErrors = models.events.validate(newEvent, false);
      if (validationErrors) res.status(422).json({ validationErrors });
      else {
        models.events
          .update(newEvent, req.params.id)
          .then(([result]) => {
            if (result.affectedRows === 0)
              throw new Error("No change affected");
            delete newEvent.password_hash;
            res.status(201).send({ ...newEvent });
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
      models.events
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

module.exports = EventsController;
