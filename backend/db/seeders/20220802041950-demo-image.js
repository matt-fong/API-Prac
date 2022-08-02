'use strict';

const images = [
  {
    url: 'https://media.istockphoto.com/photos/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-picture-id1211174464?k=20&m=1211174464&s=612x612&w=0&h=fQ3ahmaJnYcZb0UQtBXvOhcuhHFTgK9BA5Mylic7Gnw=',
    previewImage: true,
    spotId: 2,
    reviewId: 1,
    userId: 1
  },
  {
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
    previewImage: true,
    spotId: 1,
    reviewId: 2,
    userId: 2
  },
  {
    url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg',
    previewImage: true,
    spotId: 3,
    reviewId: 3,
    userId: 3
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', images, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      spotId: { [Op.in]: [1,2,3] }
    })
  }
};
