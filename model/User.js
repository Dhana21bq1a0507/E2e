const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/Student';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(async (err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    try {
        // Specify the database and collection
        const database = client.db('Student');
        const collection = database.collection('leavebalances');

        // Data to be inserted
        const userData = {
            username: 'exampleUser',
            password: 'examplePassword'
        };

        // Insert the document into the collection
        await collection.insertOne(userData);

        console.log('Document inserted successfully');
    } finally {
        // Close the connection
        await client.close();
    }
});
app.listen(3300, () => console.log('server is up'));
