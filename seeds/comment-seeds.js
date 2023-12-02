const { Comment } = require('../models');  // import the Comment model

const commentData = [
    {
        comment_text: "Things",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Yeah, things",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Hello things!",
        user_id: 3,
        post_id: 3      
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;