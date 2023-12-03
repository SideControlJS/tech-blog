// importing seed info
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database Synced');
    await seedUsers();
    console.log('Users Seeded');
    await seedPosts(); // This must complete successfully before seedComments is called
    console.log('Posts Seeded');
    await seedComments();
    console.log('Comments Seeded');
    process.exit(0);
};

seedAll();
