const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id }
  });

  let bookingsArr = []

  for (let booking of bookings) {
    let spot = await Spot.findOne({
      where: { id: booking.spotId },
        raw: true,
        attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
    })

    let image = await Image.findOne({
      where:{
        spotId: booking.spotId,
        previewImage: true
      }
    })

    if (image) {
      spot.previewImage = image.url
    } else {
      spot.previewImage = null
    }

    let response = {
      id: booking.id,
      spotId: booking.spotId,
      Spot: spot,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }

    bookingsArr.push(response)
  }

  res.json({ Bookings: bookingsArr })
})

module.exports = router;
