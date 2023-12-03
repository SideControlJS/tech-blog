const { Post } = require('../models');

const postData = [
    {
        title: "Things",
        content: "Things",
        user_id: 1
    },
    {
        title: "Yeah, things",
        content: "Yeah, things",
        user_id: 2
    },
    {
        title: "Hello things!",
        content: "Hello things!",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;