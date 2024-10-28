const express = require('express');
const mongodb = require('mongodb');

const app = express();
const MongoClient = mongodb.MongoClient;
const uri = "mongodb://localhost:27017"; // MongoDB connection string
const dbName = "COP4331";
let db;

app.use(express.json());

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to Database');
  })
  .catch(error => console.error(error));

app.post('/searchEmail', (req, res) => {
    const { search, userId } = req.body;

    // Search for an exact, case-sensitive email match
    db.collection('Contacts').findOne({ Email: search, UserID: userId })
      .then(result => {
        if (result) {
          // Email found, send the results
          res.json({
            results: [{
              Name: result.Name,
              Phone: result.Phone,
              Email: result.Email,
              ID: result.ID
            }],
            error: ""
          });
        } else {
          // No match found
          res.json({
            id: 0,
            firstName: "",
            lastName: "",
            error: "email does not exist"
          });
        }
      })
      .catch(error => {
        console.error(error);
        res.json({
          id: 0,
          firstName: "",
          lastName: "",
          error: "An error occurred while searching"
        });
      });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
