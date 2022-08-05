const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Get All Spots
router.get('/', async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page) || page > 10) page = 0;
  if (Number.isNaN(size) || size > 20) size = 20;

  const pagination = {};

  if (page >= 0 || size >= 0) {
      pagination.limit = size;
      pagination.offset = size * (page - 1);
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

    spot.avgRating = avgRating.avgRating;

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

  console.log(rating)

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

module.exports = router;
