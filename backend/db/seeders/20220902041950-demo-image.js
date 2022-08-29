'use strict';

const images = [
  {
    url: 'https://media.istockphoto.com/photos/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-picture-id1211174464?k=20&m=1211174464&s=612x612&w=0&h=fQ3ahmaJnYcZb0UQtBXvOhcuhHFTgK9BA5Mylic7Gnw=',
    previewImage: true,
    spotId: 1,
    reviewId: null,
    userId: 1
  },
  {
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
    previewImage: true,
    spotId: 2,
    reviewId: null,
    userId: 2
  },
  {
    url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg',
    previewImage: true,
    spotId: 3,
    reviewId: null,
    userId: 3
  },
  {
    url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b580.jpg',
    previewImage: true,
    spotId: 4,
    reviewId: null,
    userId: 4
  },
  {
    url: 'https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg',
    previewImage: true,
    spotId: 5,
    reviewId: null,
    userId: 5
  },
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
    previewImage: true,
    spotId: 6,
    reviewId: null,
    userId: 6
  },
  {
    url: 'https://www.build-review.com/wp-content/uploads/2020/07/luxury-real-estate.jpg',
    previewImage: true,
    spotId: 7,
    reviewId: null,
    userId: 7
  },
  {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
    previewImage: true,
    spotId: 8,
    reviewId: null,
    userId: 8
  },
  {
    url: 'https://i.pinimg.com/originals/a1/c7/10/a1c710b599e8b83e74fef1371653987b.png',
    previewImage: true,
    spotId: 9,
    reviewId: null,
    userId: 9
  },
  {
    url: 'https://cdn.decoist.com/wp-content/uploads/2021/06/Modular-black-house-with-balcony-49706.jpg',
    previewImage: true,
    spotId: 10,
    reviewId: null,
    userId: 10
  },
  {
    url: 'https://assets.architecturaldigest.in/photos/60083e76274aca243711c3a4/4:3/w_1024,h_768,c_limit/ghaziabad-uttar-pradesh-homes-photos-1366x768.jpg',
    previewImage: true,
    spotId: 11,
    reviewId: null,
    userId: 11
  },
  {
    url: 'https://www.mydomaine.com/thmb/LhwJEsBuRKPcFOhlKbig422LrK4=/2048x1536/filters:fill(auto,1)/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg',
    previewImage: true,
    spotId: 12,
    reviewId: null,
    userId: 12
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', images, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    })
  }
};
