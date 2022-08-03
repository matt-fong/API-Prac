const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize")

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
    include: [{ model: Review, attributes: [] }],
    attributes: { include: [[ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ]]},
    group: ['Spot.id'],
    where: { ownerId: req.user.id },
  });

  res.json({ Spots: spots })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findOne({
    where: { id: spotId }
  })

  if (!spot) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  res.json(spot)
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

  const image = await Image.create({
    url,
    spotId: spot.dataValues.id,
    userId: req.user.id
  })

  const response = {
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
