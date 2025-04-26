import { useState, useEffect } from 'react';
import loading from '../img/loading.svg';
import styles from './Loading.module.css';

export function Loading() {
    const [text, setText] = useState('');
    const [showImg, setShowImg] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setText('Espere 3 segundinhos por favor');
            setShowImg(false);
        }, 30000);
    }, []);

    return (
        <div className={styles.loadingContainer}>
            {showImg ? (
                <img src={loading} alt="Carregando..." />
            ) : (
                <h3>{text}</h3>
            )}
        </div>
    );
}
