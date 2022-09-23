const models = require("../models");
const { hashPassword } = require("../helpers/argonHelper");

class UserController {
  static browse = (req, res) => {
    models.users
      .findAll()
      .then((users) => res.send(users))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.users
      .find(req.params.id)
      .then((user) => {
        if (user.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(user);
        }
      })

      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const newUser = req.body;
    const authorised = true;

    if (authorised) {
      const validateErrors = models.users.validate(newUser);
      if (validateErrors) {
        console.error(validateErrors);
        return res.status(422).json({ validateErrors });
      }

      hashPassword(newUser.password).then((hash) => {
        delete newUser.password;

        models.users
          .insert({ ...newUser, password_hash: hash })
          .then(([result]) => {
            res.status(201).send({ ...newUser, id: result.insertId });
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      });
    } else res.sendStatus(403);
    return true;
  };

  static modify = async (req, res) => {
    const newUser = req.body;
    const authorised = true;

    if (authorised) {
      if (newUser.password) {
        newUser.password_hash = await hashPassword(newUser.password);
        delete newUser.password;
      }
      const validationErrors = models.users.validate(newUser, false);
      if (validationErrors) res.status(422).json({ validationErrors });
      else {
        models.users
          .update(newUser, req.params.id)
          .then(([result]) => {
            if (result.affectedRows === 0)
              throw new Error("No change affected");
            delete newUser.password_hash;
            res.status(201).send({ ...newUser });
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    } else res.sendStatus(403);
  };

  static delete = async (req, res) => {
    const authorised = true;

    if (authorised) {
      models.users
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

module.exports = UserController;
