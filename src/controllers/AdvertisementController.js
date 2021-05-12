const AdvertisementModule = require("../modules/AdvertisementModule");
const { deleteFileFromDisk } = require("../helper");

module.exports = {
  // получить объявление по id
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const advertisement = await AdvertisementModule.getOne(id);

      if (advertisement) {
        res.json({
          data: advertisement,
          status: "ok",
        });
      } else {
        res.json({
          error: "Объявление не найдено",
          status: "error",
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

      res.json({
        data: advertisements,
        status: "ok",
      });
    } catch (err) {
      console.log(err);

      res.json({
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

      res.json({
        data: {
          id: advertisement.id,
          shortTitle: advertisement.shortTitle,
          description: advertisement.description,
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

      res.json({
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
      const advertisement = await AdvertisementModule.getOne(id);

      if (advertisement) {
        const { user } = advertisement;

        if (user.id !== currentUser.id) {
          res.status(403).json({
            error: "Ошибка",
            status: "error",
          });
        } else {
          await AdvertisementModule.remove(id);

          res.json({
            status: "ok",
          });
        }
      }
    } catch (err) {
      console.log(err);

      res.json({
        error: "Ошибка",
        status: "error",
      });
    }
  },
};
