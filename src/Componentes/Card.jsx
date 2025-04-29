import estilo from './Card.module.css';
import { motion } from 'framer-motion'


export function Card({ movie, onOpenModal }) {
    return (
        <motion.div 
            initial = {{ opacity: 0, scale: 0.95}}
            animate = {{ opacity: 1, scale: 1}}
            transition = {{ duration: 0.5 }}
            className={estilo.conteiner}
        >
            <div className={estilo.imagem}>
                <img
                    className={estilo.img_card}
                    src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    onClick={() => onOpenModal(movie)}
                />
            </div>
            <div>
    
            </div>
            {/* <div className={estilo.genre_movies}>
                <h3>
                    {movie.genre_names.map((genre, index) => (
                        <span key={index} className={estilo.genre}>{genre}</span>
                    ))}
                </h3>
            </div> */}
        </motion.div>
    );
}
