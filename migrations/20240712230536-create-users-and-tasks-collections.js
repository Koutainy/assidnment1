// migrations/YYYYMMDDHHMMSS-create-users-and-tasks-collections.js

module.exports = {
  async up(db, client) {
    // Create users collection
    await db.createCollection('users');
    await db.collection('users').createIndex({ username: 1 }, { unique: true });

    // Insert initial users
    await db.collection('users').insertMany([
      {
        username: 'admin',
        password: 'hashed_password_for_admin', // Replace with a hashed password
        role: 'admin',
        tasks: [],
      },
      {
        username: 'user1',
        password: 'hashed_password_for_user1', // Replace with a hashed password
        role: 'user',
        tasks: [],
      },
    ]);

    // Create tasks collection
    await db.createCollection('tasks');

    // Insert initial tasks
    await db.collection('tasks').insertMany([
      {
        title: 'Admin Task 1',
        description: 'Task for admin',
        assignedTo: 'admin',
        status: 'pending',
      },
      {
        title: 'User Task 1',
        description: 'Task for user1',
        assignedTo: 'user1',
        status: 'pending',
      },
    ]);
  },

  async down(db, client) {
    await db.collection('tasks').drop();
    await db.collection('users').drop();
  },
};
