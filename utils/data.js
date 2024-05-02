// list of names
const names = [
    'Broccoli',
    'Roses',
    'Dill-pickle',
    'Jason',
    'Rachel',
    'Nora',
    'Samantha',
    'Bruce',
    'Mark'
];

// list of Thoughts
const text = [
    'I love pancakes',
    'I like foxes',
    'She ate the whole pizza!',
    'Coding is fun',
    'I enjoy reading books'
];

// list of domains
const domains = [
    '@yahoo.com',
    '@aol.com',
    '@gmail.com', 
    '@hotmail.com',
    '@outlook.com'
];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// create a function called getRandomUser
const getRandomUser = () => 
`${getRandomArrItem(names)}`;
    
// create a function called getRandomThought
const getRandomThought = () => ({
    thoughtText: getRandomArrItem(text)
});
// `${getRandomArrItem(text)}`;

// create a function called getRandomemail
    // need to change getRandomEmail to create random emails (currently have 3 in schema, with it being told to write 10)
const getRandomEmail = () => {
    const name = getRandomArrItem(names).toLowerCase();
    const domain = getRandomArrItem(domains);
    return `${name}${domain}`;
}

// Export the functions for use in seed.js
module.exports = { getRandomUser, getRandomThought, getRandomEmail };