const bcrypt = require("bcrypt");
const UserModule = require("../modules/UserModule");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModule.findById(id, (err, user) => {
    done(err, user);
  });
});

const verify = async (email, password, done) => {
  try {
    const user = await UserModule.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, "Неверный логин или пароль");
      }
    } else {
      return done(null, false, "Пользователь не найден");
    }
  } catch (err) {
    return done(err);
  }
};

const options = {
  usernameField: "email",
  passwordField: "password",
};

//  Добавление стратегии для использования
passport.use("local", new LocalStrategy(options, verify));

module.exports = passport;
