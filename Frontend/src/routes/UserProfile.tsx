import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from "react";
import axios from "axios";
import styles from '../style/UserProfile.module.css';

import { PathContext } from "../utils/PathProvider.js";
import { AuthContext } from "../utils/AuthProvider.js";
import NavTop from "../components/NavTop/NavTop.js";

// Define types for user data
interface User {
    _id: string;

    email: string;
    username: string;
}

const UserProfile: React.FC = () => {

    const serverPath: string = useContext(PathContext);

    const authInfo = useContext(AuthContext);

    if (!authInfo) {
        throw new Error("useContext must be used within an AuthProvider");
    }

    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User>({
        _id: "",
        email: "",
        username: "",
    });

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.post<User>(serverPath + "fetchUserByID", { _id: authInfo.auth.userID });
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
            const response = await axios.put<User>(serverPath + "updateUser", formData);
            setUser(response.data);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <>
            <NavTop />
            <div className={styles.profileContainer}>
                <h1>User Profile</h1>

                {user ? (
                    <div className={styles.profileContent}>
                        {!isEditing ? (
                            <div className={styles.profileDetails}>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                            </div>
                        ) : (
                            <form className={styles.profileForm} onSubmit={handleSubmit}>
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
        </>

    );
};

export default UserProfile;
