const express = require("express");
const router = express.Router();
const AdvertisementController = require("../controllers/AdvertisementController");
const isAuthenticatedMiddleware = require("../middleware/isAuthenticated");

// получить объявление по id
router.get("/advertisement/:id", AdvertisementController.getOne);

// получить список объявлений
router.get("/advertisement", AdvertisementController.getAll);

// создать объявление
router.post(
  "/advertisement",
  isAuthenticatedMiddleware,
  AdvertisementController.create
);

// удалить объявление по id
router.delete(
  "/advertisement/:id",
  isAuthenticatedMiddleware,
  AdvertisementController.delete
);

module.exports = router;
