import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import './UserProfile.css';


// Define types for user data
interface User {
    _id: string;
    firstname: string | null;
    lastname: string | null;
    email: string;
    username: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User>({
        _id: "",
        firstname: "",
        lastname: "",
        email: "",
        username: "",
    });

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.post<User>("/fetchUserByID", { _id: "64d7c50f5b9a4e0010f8c95b" });
                setUser(response.data);
                setFormData(response.data); // Prepopulate form with user data
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle input changes in the form
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit updated user data
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put<User>("/updateUser", formData);
            setUser(response.data);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>

            {user ? (
                <div className="profile-content">
                    {!isEditing ? (
                        <div className="profile-details">
                            <p><strong>First Name:</strong> {user.firstname || "N/A"}</p>
                            <p><strong>Last Name:</strong> {user.lastname || "N/A"}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    ) : (
                        <form className="profile-form" onSubmit={handleSubmit}>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
