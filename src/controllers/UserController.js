const bcrypt = require("bcrypt");
const UserModule = require("../modules/UserModule");

module.exports = {
  // регистрация
  async signup(req, res, next) {
    const { name, email, password, contactPhone } = req.body;

    try {
      const candidate = await UserModule.findByEmail(email);

      if (candidate) {
        res.send({
          error: "Email занят",
          status: "error",
        });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await UserModule.create({
          name,
          email,
          passwordHash,
          contactPhone,
        });

        res.send({
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
          },
          status: "ok",
        });
      }
    } catch (err) {
      console.log(err);

      res.send({
        error: "Ошибка",
        status: "error",
      });
    }
  },

  // аутентификация
  async signin(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await UserModule.findByEmail(email);

      if (user) {
        const areSame = await bcrypt.compare(password, user.passwordHash);

        if (areSame) {
          res.send({
            data: {
              id: user.id,
              email: user.email,
              name: user.name,
              contactPhone: user.contactPhone,
            },
            status: "ok",
          });
        } else {
          res.send({
            error: "Неверный логин или пароль",
            status: "error",
          });
        }
      } else {
        res.send({
          error: "Пользователь не найден",
          status: "error",
        });
      }
    } catch (err) {
      console.log(err);

      res.send({
        error: "Ошибка",
        status: "error",
      });
    }
  },
};
