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

    


    return (
        <>
            <NavTop />
            <section className={styles.sectionBg}>
                <CarouselItem/>
            </section>
        </>
    );
};

export default Home;
