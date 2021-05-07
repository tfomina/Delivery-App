const AdvertisementModule = require("../modules/AdvertisementModule");
const { deleteFileFromDisk } = require("../helper");

module.exports = {
  // получить объявление по id
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const advertisement = await AdvertisementModule.getOne(id);

      if (advertisement) {
        res.send({
          data: advertisement,
          status: "ok",
        });
      } else {
        res.send({
          error: "Объявление не найдено",
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

  // получить список объявлений
  async getAll(req, res, next) {
    const { shortTitle, description, userId, tags } = req.query;

    try {
      const advertisements = await AdvertisementModule.find({
        shortTitle,
        description,
        userId,
        tags,
      });

      res.send({
        data: advertisements,
        status: "ok",
      });
    } catch (err) {
      console.log(err);

      res.send({
        error: "Ошибка",
        status: "error",
      });
    }
  },

  // создать объявление
  async create(req, res, next) {
    const { user: currentUser } = req;

    const { shortTitle, description, tags } = req.body;
    const currentDate = new Date().toISOString();

    const images = req.files.map((file) => file.path) || [];

    try {
      const advertisement = await AdvertisementModule.create({
        shortTitle,
        description,
        images,
        user: currentUser.id,
        createdAt: currentDate,
        updatedAt: currentDate,
        tags,
        isDeleted: false,
      });

      res.send({
        data: {
          id: advertisement.id,
          shortTitle: advertisement.shortTitle,
          description: advertisement.shortTitle,
          images: advertisement.images,
          user: {
            id: currentUser.id,
            name: currentUser.name,
          },
          createdAt: advertisement.createdAt,
        },
        status: "ok",
      });
    } catch (err) {
      console.log(err);

      // если при создании объявления что-то пошло не так, удаляем все сохраненные изображения
      images.forEach((image) => deleteFileFromDisk(image));

      res.send({
        error: "Ошибка",
        status: "error",
      });
    }
  },

  // удалить объявление по id
  async delete(req, res, next) {
    const { user: currentUser } = req;
    const { id } = req.params;

    try {
      const advertisement = await AdvertisementModule.findById(id);

      if (advertisement) {
        const { user } = advertisement;

        if (user.toString() !== currentUser.id) {
          res.status(403).send({
            error: "Ошибка",
            status: "error",
          });
        } else {
          await AdvertisementModule.remove(id);

          res.send({
            status: "ok",
          });
        }
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
