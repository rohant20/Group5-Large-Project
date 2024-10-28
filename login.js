const { MongoClient } = require("mongodb");

async function loginUser(inData) {
    const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("COP4331");
        const users = database.collection("Users");

        // Find user by either username or email and password
        const query = {
            $or: [
                { username: inData.login },
                { email: inData.login }
            ],
            password: inData.password
        };

        const user = await users.findOne(query);

        if (user) {
            return returnWithInfo(user.firstName, user.lastName, user._id);
        } else {
            return returnWithError("No Records Found");
        }
    } catch (error) {
        return returnWithError(error.message);
    } finally {
        await client.close();
    }
}

function returnWithInfo(firstName, lastName, id) {
    return JSON.stringify({
        id: id,
        firstName: firstName,
        lastName: lastName,
        error: ""
    });
}

function returnWithError(error) {
    return JSON.stringify({
        id: 0,
        firstName: "",
        lastName: "",
        error: error
    });
}

// Example usage
const inData = { login: "user@example.com", password: "userpassword" };
loginUser(inData).then(response => console.log(response));
