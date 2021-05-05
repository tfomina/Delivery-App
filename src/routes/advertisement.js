const express = require("express");
const router = express.Router();
const AdvertisementController = require("../controllers/AdvertisementController");
const { isAuthenticatedMiddleware } = require("../middleware");

// получить объявление по id
router.get("/:id", AdvertisementController.getOne);

// получить список объявлений
router.get("/", AdvertisementController.getAll);

// создать объявление
router.post("/", isAuthenticatedMiddleware, AdvertisementController.create);

// удалить объявление по id
router.delete(
  "/:id",
  isAuthenticatedMiddleware,
  AdvertisementController.delete
);

module.exports = router;
