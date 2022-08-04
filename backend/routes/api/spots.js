const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Get All Spots
router.get('/', async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: [], where: { previewImage: true } }
    ],
    attributes: {
      include: [
        [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ],
        [ sequelize.literal('Images.url'), 'previewImage' ]
      ]
    },
    group: ['Spot.id'],
  })

  res.json({ Spots: spots })
})

// Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth, async (req, res)=>{
  const spots = await Spot.findAll({
    include: [
      { model: Review, attributes: [] },
    ],
    attributes: {
      include: [
        [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ]
      ]
    },
    group: ['Spot.id'],
    where: { ownerId: req.user.id },
  });

  for (let spot of spots) {
    const image = await Image.findOne({
      attributes: ['url'],
      where: {
        previewImage: true,
        spotId: spot.id
      }
    })

    spot.dataValues.previewImage = image
  }

  res.json({ Spots: spots })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const numReviews = await Review.count({
    where: { spotId: spotId }
  })

  const rating = await Review.findOne({
    attributes: [[ sequelize.fn("avg", sequelize.col('stars')), "avgStarRating" ]],
    where: { spotId: spotId },
    raw: true
  })

  const images = await Image.findAll({
    attributes: [ 'id', ['spotId', 'imageableId'], 'url' ],
    where: { spotId: spotId }
  })

  const owner = await User.findByPk(spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  })

  const response = spot.toJSON()

  response.numReviews = numReviews
  response.avgStarRating = rating.avgStarRating
  response.Images = images
  response.Owner = owner

  res.json(response)
})

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
  const ownerId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  const spot = await Spot.create({
    ownerId: ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  })

  res.json(spot)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, restoreUser, async (req, res, next) => {
  const spotId = req.params.spotId
  const { url } = req.body
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      message:"Spot couldn't be found",
      statusCode: 404
    })
  }

  console.log(spot)

  let image = await Image.create({
    url,
    spotId: spot.dataValues.id,
    userId: req.user.id
  })

  let response = {
    id: image.id,
    imageableId: image.spotId,
    url: image.url
  }

  res.json(response)

})

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      message:"Spot couldn't be found",
      statusCode: 404
    })
  }

  spot.address = address,
  spot.city = city,
  spot.state = state,
  spot.country = country,
  spot.lat = lat,
  spot.lng = lng,
  spot.name = name,
  spot.description = description,
  spot.price = price,

  await spot.save()
  res.json(spot)
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  spot.destroy()
  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId
  const { review, stars } = req.body
  let spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const checkReviews = await Review.findAll({
    where: {
      [Op.and]: [
        { spotId: spotId},
        { userId: req.user.id }
      ]
    }
  })

  if (!review || !stars || stars > 5 || stars < 1) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      }
    })
  }

  if (checkReviews.length > 0) {
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spotId,
    review,
    stars,
  })

  res.json(newReview)
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
  const spotId = req.params.spotId
  let spot = await Spot.findByPk(spotId)

  const reviews = await Review.findAll({
    where: { spotId: spotId },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Image, attributes: ['id', ['spotId', 'imageableId'], 'url'] }
    ]
  });

  if (!spot) {
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  res.json({ Reviews: reviews })
})

// Create a Booking for a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId
  const { startDate, endDate } = req.body
  let spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const currentBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [
        {endDate: {[Op.gte]: startDate}},
        {startDate: {[Op.lte]: endDate}},
      ],
    },
  });

  if (startDate >= endDate) {
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

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

  let booking = await Booking.create({
    spotId: spotId,
    userId: req.user.id,
    startDate,
    endDate
  })

  res.json({ booking })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId
  let spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  // If you ARE NOT the owner of the spot
  if (spot.ownerId !== req.user.id) {
    let notOwnerBookings = await Booking.findAll({
      where: { spotId: spotId },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    res.json({ Bookings: notOwnerBookings })
  }

  // If you ARE the owner of the spot
  if (spot.ownerId === req.user.id) {
    let ownerBookings = await Booking.findAll({
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }],
      where: { spotId: spotId },
    })
    res.json({ Bookings: ownerBookings })
  }

})

module.exports = router;
