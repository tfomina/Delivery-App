const bcrypt = require("bcrypt");
const UserModule = require("../modules/UserModule");
const passport = require("../passport/setup");

module.exports = {
  // регистрация
  async signup(req, res, next) {
    const { name, email, password, contactPhone } = req.body;

    try {
      const candidate = await UserModule.findByEmail(email);

      if (candidate) {
        res.json({
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

        res.json({
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

      res.json({
        error: "Ошибка",
        status: "error",
      });
    }
  },

  // аутентификация
  signin(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.json({
          error: info,
          status: "error",
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.json({
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
          },
          status: "ok",
        });
      });
    })(req, res, next);
  },

  // выход
  logout(req, res, next) {
    req.logout();
    res.json({
      status: "ok",
    });
  },
};
