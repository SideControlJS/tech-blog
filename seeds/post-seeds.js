const { Post } = require('../models');

const postData = [
    {
        title: "Things",
        post_text: "Things",
        user_id: 1
    },
    {
        title: "Yeah, things",
        post_text: "Yeah, things",
        user_id: 2
    },
    {
        title: "Hello things!",
        post_text: "Hello things!",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;