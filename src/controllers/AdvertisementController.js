const AdvertisementModule = require("../modules/AdvertisementModule");

module.exports = {
  // получить объявление по id
  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const advertisement = await AdvertisementModule.getOne(id);

      if (advertisement) {
        res.send({
          data: {
            id: advertisement.id,
            shortTitle: advertisement.shortTitle,
            advertisement: advertisement.decription,
            images: advertisement.images,
            user: {
              id: "", // TODO Доработать
              name: "", // TODO Доработать
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
  async create(req, res, next) {},

  // удалить объявление по id
  async delete(req, res, next) {},
};
