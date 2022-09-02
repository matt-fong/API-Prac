const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Get All Spots (With Pagination)
router.get('/', async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page) || page > 10) page = 0;
  if (Number.isNaN(size) || size > 20) size = 20;

  const pagination = {};

  if (page > 0) {
    pagination.offset = size * (page - 1)
}

  if (size >= 0) {
    pagination.limit = size;
  }

  if (page < 0) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        page: "Page must be greater than or equal to 0"
      }
    })
  }

  if (size < 0) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        size: "Size must be greater than or equal to 0"
      }
    })
  }

  if (maxLat) {
    if (Number.isNaN(parseFloat(maxLat))) {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          size: "Maximum latitude is invalid"
        }
      })
    }
  }

  if (minLat) {
    if (Number.isNaN(parseFloat(minLat))) {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          size: "Minimum latitude is invalid"
        }
      })
    }
  }

  if (minLng) {
    if (Number.isNaN(parseFloat(minLng))) {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          size: "Maximum longitude is invalid"
        }
      })
    }
  }

  if (maxLng) {
    if (Number.isNaN(parseFloat(maxLng))) {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          size: "Minimum longitude is invalid"
        }
      })
    }
  }

  if (minPrice) {
    if (Number.isNaN(parseFloat(minPrice)) || (parseFloat(minPrice) < 0)) {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          size: "Maximum price must be greater than or equal to 0"
        }
      })
    }
  }

  if (maxPrice) {
    if (Number.isNaN(parseFloat(maxPrice)) || (parseFloat(minPrice) < 0)) {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          size: "Minimum price must be greater than or equal to 0"
        }
      })
    }
  }

  let spots = await Spot.findAll({
    limit: pagination.limit,
    offset: pagination.offset,
    raw: true
  })

  for (let spot of spots) {

    let avgRating = await Review.findOne({
      attributes: [[ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]],
      where: { spotId: spot.id },
      raw: true
    })

    let previewImage = await Image.findOne({
      attributes: ['url'],
      where: {
        previewImage: true,
        spotId: spot.id
      },
      raw: true
    });

    spot.avgRating = parseFloat(parseFloat(avgRating.avgRating).toFixed(1))

    if (spot.previewImage = previewImage !== null) {
      spot.previewImage = previewImage.url
    } else {
      spot.previewImage = null
    }
  }

  res.json({ Spots: spots, page, size });
})

// Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth, async (req, res)=>{
  const spots = await Spot.findAll({
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

    let avgRating = await Review.findOne({
      attributes: [[ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]],
      where: { spotId: spot.id },
      raw: true
    })

    if (isNaN(parseFloat(parseFloat(avgRating.avgRating).toFixed(1)))) {
      spot.dataValues.avgRating = null
    } else {
      spot.dataValues.avgRating = parseFloat(parseFloat(avgRating.avgRating).toFixed(1))
    }

    spot.dataValues.previewImage = image.url
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

  if (isNaN(parseFloat(parseFloat(rating.avgStarRating).toFixed(1)))) {
    response.avgStarRating = null
  } else {
    response.avgStarRating = parseFloat(parseFloat(rating.avgStarRating).toFixed(1))
  }

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
  const { url, previewImage } = req.body
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
    userId: req.user.id,
    previewImage,
  })

  console.log(image)

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
    spotId: parseInt(spotId),
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
      { model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] }
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
  let { startDate, endDate } = req.body
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
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

  if (currentBookings.length) {
    return res.json({
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
      attributes: ['spotId', 'startDate', 'endDate'],
      where: { spotId: spotId },
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
