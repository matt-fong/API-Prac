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

// Edit a Booking
router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
  const bookingId = req.params.bookingId
  const { startDate, endDate } = req.body
  const newBooking = await Booking.findByPk(bookingId)

  if (startDate > endDate) {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

  if (!newBooking) {
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  let now = Date.now()
  let bookingdate = new Date(newBooking.endDate)
  if (now > bookingdate) {
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  const spotId = newBooking.spotId

  const currentBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [
        {endDate: {[Op.gte]: startDate}},
        {startDate: {[Op.lte]: endDate}},
      ],
    },
  });

  if (currentBookings.length) {
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  if (newBooking.userId === req.user.id) {
    newBooking.startDate = startDate,
    newBooking.endDate = endDate,

    await newBooking.save()
    res.json(newBooking)
  }
})

module.exports = router;
