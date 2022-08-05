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

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
      { model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] },
    ],
    where: { userId: req.user.id },
  });

  res.json({ Reviews: reviews })

})

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
  const reviewId = req.params.reviewId
  const { review, stars } = req.body
  const newReview = await Review.findByPk(reviewId)

  if (!newReview) {
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

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

  newReview.review = review,
  newReview.stars = stars,

  await newReview.save()
  res.json(newReview)
})

// Delete a Review
router.delete('/:reviewId', requireAuth, restoreUser, async (req, res, next) => {
  const reviewId = req.params.reviewId
  const review = await Review.findByPk(reviewId)

  if (!review) {
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

  if (review.userId === req.user.id) {
    review.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }

})

module.exports = router;
