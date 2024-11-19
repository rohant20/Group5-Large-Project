const { connectToDatabase, returnWithError, returnWithMessage } = require("./utils");

async function verifyToken(token) {
    try {
        console.log("Verifying token:", token); // Log the token being verified

        // Connect to the database
        const database = await connectToDatabase();
        console.log("Connected to database successfully"); // Log successful DB connection

        const users = database.collection("Users");

        // Query the database to find the user with the provided token
        const user = await users.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }, // Ensure token hasn't expired
        });

        console.log("User found during token verification:", user); // Log user object if found

        if (!user) {
            console.error("Token verification failed: invalid or expired token"); // Log error if no user found
            return returnWithError("Invalid or expired token");
        }

        console.log("Token is valid for user:", user.email); // Log success
        return returnWithMessage("Token is valid", { userId: user._id, email: user.email });
    } catch (error) {
        console.error("Error during token verification:", error); // Log any unexpected errors
        return returnWithError("An error occurred during token verification");
    }
}

module.exports = { verifyToken };
