import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthProvider';

import NavTop from '../components/NavTop/NavTop';
import styles from "../style/Home.module.css";

import CarouselItem from '../components/Carousel/Carousel';

const Home: React.FC = () => {
    const userInfo = useContext(AuthContext);

    if (!userInfo) {
        throw new Error("useContext must be used within an AuthProvider");
    }

    const { auth } = userInfo;


    return (
        <>
            <NavTop />
            <CarouselItem/>
            <section className={styles.sectionBg}>
                <h1>Hello {auth.username}</h1>
            </section>
        </>
    );
};

export default Home;
