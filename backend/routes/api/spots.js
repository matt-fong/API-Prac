const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User } = require("../../db/models");
const { Op } = require("sequelize")

const router = express.Router();

router.get('/', async (req, res, next) => {
  const spots = await Spot.findAll()

  res.status(200)
  res.json({spots})
})

router.get('/current', requireAuth, async(req,res)=>{
  const currentuserspots = await Spot.findAll({
    where:{ ownerId: req.user.id }
  });

  res.json(currentuserspots);
})

module.exports = router;
