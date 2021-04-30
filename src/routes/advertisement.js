const express = require("express");
const router = express.Router();
const AdvertisementController = require("../controllers/AdvertisementController");

// получить объявление по id
router.get("/advertisement/:id", AdvertisementController.getOne);

// получить список объявлений
router.get("/advertisement", AdvertisementController.getAll);

// создать объявление
router.post("/advertisement", AdvertisementController.create);

// удалить объявление по id
router.delete("/advertisement/:id", AdvertisementController.delete);

module.exports = router;
