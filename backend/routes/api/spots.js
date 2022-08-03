const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize")

const router = express.Router();

// Get All Spots
router.get('/', async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: [], where: {previewImage:true} }
    ],
    attributes: {
      include: [
        [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ],
        [ sequelize.literal('Images.url'), 'previewImage' ]
      ]
    },
    group: ['Spot.id'],
  })

  res.json({ Spot: spots })
})

// Get Spots for Current User
router.get('/current', requireAuth, async (req, res)=>{
  const currentuserspots = await Spot.findAll({
    where:{ ownerId: req.user.id }
  });

  res.json(currentuserspots);
})

// Get Details of a Spot by Id
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

module.exports = router;
