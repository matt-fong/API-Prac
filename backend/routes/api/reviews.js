const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, restoreUser, async (req, res, next) => {
  const reviewId = req.params.reviewId
  const { url, previewImage } = req.body
  let review = await Review.findByPk(reviewId)

  if (!review) {
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

  let image = await Image.create({
    url: url,
    previewImage: previewImage,
    reviewId: reviewId,
    userId: req.user.id
  })

  let count = await Image.findAll({
    where: {
      [Op.and]:[
        { reviewId: reviewId }, { previewImage: previewImage }
      ]
    }
  })

  if(count.length >= 10) {
    res.json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403
    })
  }

  let response = {
    id: image.id,
    imageableId: image.reviewId,
    url: image.url
  }

  res.json(response)

})

module.exports = router;
