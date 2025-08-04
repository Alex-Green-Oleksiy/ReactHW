import React from 'react';
import { backgroundImage } from '@/assets/images';
import styles from './BackgroundImage.module.css';

const BackgroundImage = () => {
    return (
        <div 
            className={styles.background}
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        />
    );
};

export default BackgroundImage; 