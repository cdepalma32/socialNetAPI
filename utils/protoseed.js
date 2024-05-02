// const connection = require('../config/connection');
// const { User } = require('../models'); // removed thought
// const { getRandomUser, getRandomThought, getRandomEmail } = require('./data');
// // change/update line 3 when we make data.js!

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log('connected');
//     // Delete the collections if they exist
//     let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
//     if (thoughtCheck.length) {
//       await connection.dropCollection('thoughts');
//       console.log('delete thoughts collections log');
//     }
//     console.log('usersCheckLength console');
//     let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
//     if (usersCheck.length) { 
//       console.log('usersCheckLength console');
//       await connection.dropCollection('users');
//       console.log('delete user collections log');
//     }


//   // Create empty array to hold the users
//   const users = [];

//   // Loop 10 times -- add user to the users array
//   for (let i = 0; i < 10; i++) {
//     // Get some random assignment objects using a helper function that we imported from ./data
//     const thoughts = getRandomThought(10);
//     const username = getRandomUser();
//     const email = getRandomEmail();

//     users.push({
//     username,
//     email,
//     thoughts
//     });
//   }

//   console.log('Users to be inserted:', users);
//   // Add users to the collection and await the results
//   const userData = await User.insertMany(users);


//   // Log out the seed data to indicate what should appear in the database
//   console.table(users);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// });


// const connection = require('../config/connection');
// const { User } = require('../models');
// const { getRandomUser, getRandomThought, getRandomEmail } = require('./data');
// const { ValidationError } = require('mongoose').Error;

// connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
//   process.exit(1); // Exit the process if there's a MongoDB connection error
// });

// connection.once('open', async () => {
//   console.log('connected');

//   try {
//     // Delete the collections if they exist
//     let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
//     if (thoughtCheck.length) {
//       await connection.dropCollection('thoughts');
//       console.log('Deleted thoughts collection');
//     }

//     let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
//     if (usersCheck.length) { 
//       await connection.dropCollection('users');
//       console.log('Deleted users collection');
//     }

//     // Create empty array to hold the users
//     const users = [];

//     // Loop 10 times -- add user to the users array
//     for (let i = 0; i < 10; i++) {
//       // Get some random assignment objects using helper functions
//       const thoughts = getRandomThought(10);
//       const username = getRandomUser();
//       const email = getRandomEmail();

//       users.push({ username, email, thoughts });
//     }

//     console.log('Users to be inserted:', users);
//     // Add users to the collection and await the results
//     const userData = await User.insertMany(users);

//     // Log out the seed data to indicate what should appear in the database
//     console.table(users);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       console.error('ValidationError:', error.message);
//     } else if (error instanceof CastError) {
//       console.error('CastError:', error.message);
//     } else {
//       console.error('An unexpected error occurred:', error);
//     }
//     process.exit(1); // Exit the process if there's an error
//   }
// });
