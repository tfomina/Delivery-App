const AdvertisementModule = require("../modules/AdvertisementModule");
const UserModule = require("../modules/UserModule");
const { deleteFileFromDisk } = require("../helper");

module.exports = {
  // получить объявление по id
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const advertisement = await AdvertisementModule.findById(id);

      if (advertisement) {
        const user = await UserModule.findById(advertisement.userId);

        res.send({
          data: {
            id: advertisement.id,
            shortTitle: advertisement.shortTitle,
            description: advertisement.description,
            images: advertisement.images,
            user: {
              id: user.id,
              name: user.name,
            },
            createdAt: advertisement.createdAt,
          },
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
  async getAll(req, res, next) {},

  // создать объявление
  async create(req, res, next) {
    const { user } = req;

    const { shortTitle, description, tags } = req.body;
    const currentDate = new Date().toISOString();

    const images = req.files.map((file) => file.path) || [];

    try {
      const advertisement = await AdvertisementModule.create({
        shortTitle,
        description,
        images,
        userId: user.id,
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
            id: user.userId,
            name: user.name,
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
    const { user } = req;
    const { id } = req.params;

    try {
      const advertisement = await AdvertisementModule.findById(id);

      if (advertisement) {
        const { userId } = advertisement;

        if (userId !== user.id) {
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
