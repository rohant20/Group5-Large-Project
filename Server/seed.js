const mongoose = require("mongoose");
const { User } = require("./models/userModel");

const seedUsers = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/userDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const sampleUsers = [
            {
                firstname: "John",
                lastname: "Doe",
                email: "johndoe@example.com",
                username: "johndoe123",
                password: "hashedpassword123",
            },
            {
                firstname: "Jane",
                lastname: "Smith",
                email: "janesmith@example.com",
                username: "janesmith456",
                password: "hashedpassword456",
            },
        ];

        await User.insertMany(sampleUsers);
        console.log("Sample data inserted!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
    }
};

seedUsers();
