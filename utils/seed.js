// const connection = require('../config/connection');
// const { Thought, User } = require('../models');
// const { getRandomUser, getRandomThought, getRandomEmail } = require('./data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log('connected');
//     // Delete the collections if they exist
//     let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
//     if (thoughtCheck.length) {
//       await connection.dropCollection('thoughts');
//     }

//     let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
//     if (usersCheck.length) {
//       await connection.dropCollection('users');
//     }


//   // Create empty array to hold the users
//   const users = [];

//   // Loop 10 times -- add users to the user array
//   for (let i = 0; i < 10; i++) {
//     // Get some random assignment objects using a helper function that we imported from ./data
//     const thoughts = getRandomThought(10);
//     const username = getRandomUser();
//     const email = getRandomEmail();


//     users.push({
//       username,
//       email,
//       thoughts
//     });
//   }

//   // Add users to the collection and await the results
//   const userData = await User.insertMany(users);

//   // // Add thoughts to the collection and await the results
//   // await thought.insertOne({
//   //   courseName: 'UCLA',
//   //   inPerson: false,
//   //   students: [...studentData.map(({_id}) => _id)],
//   // });

//   // Log out the seed data to indicate what should appear in the database
//   // can leave this out -- unless/until you are trying to implement a try catch, here
//   console.table(users);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// });

const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('connected');

  // Drop existing collections if they exist
  await connection.db.dropCollection('thoughts').catch(err => console.log('No thoughts collection to drop'));
  await connection.db.dropCollection('users').catch(err => console.log('No users collection to drop'));

  // Create example thoughts
  const thoughtDocs = await Thought.insertMany([
    { thoughtText: "I love pancakes" },
    { thoughtText: "Today is a good day" },
    // Add more thoughts as needed
  ]);

  // Create users with references to these thoughts
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      username: `user${i}`,
      email: `user${i}@example.com`,
      thoughts: thoughtDocs.map(thought => thought._id)  // Array of thought IDs
    });
  }

  await User.insertMany(users);
  console.log('Seeding complete! 🌱');
  process.exit(0);
});
