const { connectToDatabase, returnWithError, returnWithMessage } = require("./utils");

async function verifyToken(token) {
    try {
        console.log("Verifying token:", token, "Token type:", typeof token);

        // Connect to the database
        const database = await connectToDatabase();
        console.log("Connected to database:", database.databaseName);

        const users = database.collection("users");
        console.log("Collection name:", users.collectionName);

        const trimmedToken = token.trim(); // Ensure no trailing spaces or hidden characters
        const query = {
            resetToken: trimmedToken,
            resetTokenExpiration: { $gt: new Date() },
        };
        console.log("Database query:", query);

        // Log the raw query result using find() and toArray()
        const cursor = users.find(query);
        console.log("Raw query result:", await cursor.toArray()); // This will show all documents that match the query

        // Now, attempt to find the user with the query
        const user = await users.findOne(query);
        console.log("User found during token verification:", user);

        if (!user) {
            console.error("Token verification failed: invalid or expired token");
            return returnWithError("Invalid or expired token");
        }

        console.log("Token is valid for user:", user.email);
        // Only return the user, without any additional message
        return { user };
    } catch (error) {
        console.error("Error during token verification:", error);
        return returnWithError("An error occurred during token verification");
    }
}

module.exports = { verifyToken };
