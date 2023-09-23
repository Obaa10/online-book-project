const User = require('./user');

// Create a new user
User.create({ name: 'John Doe', email: 'john@example.com' })
  .then(user => {
    console.log('User created:', user.toJSON());
  })
  .catch(error => {
    console.error('Error creating user:', error);
  });

// Retrieve all users
User.findAll()
  .then(users => {
    console.log('All users:', users.map(user => user.toJSON()));
  })
  .catch(error => {
    console.error('Error retrieving users:', error);
  });