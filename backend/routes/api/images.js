const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Delete an Image
router.delete('/:imageId', requireAuth, restoreUser, async (req, res, next) => {
  const imageId = req.params.imageId
  const image = await Image.findByPk(imageId)

  if (!image) {
    res.json({
      message: "Image couldn't be found",
      statusCode: 404
    })
  }

  if (image.userId === req.user.id) {
    image.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }

})

module.exports = router;
