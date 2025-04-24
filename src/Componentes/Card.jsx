import estilo from './Card.module.css';

export function Card({ movie, onOpenModal }) {
    return (
        <div className={estilo.conteiner}>
            <div className={estilo.conteiner_text_card}>
                <h3>{movie.title}</h3>
            </div>
            <div className={estilo.imagem}>

                <img
                    className={estilo.img_card}
                    src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    onClick={() => onOpenModal(movie)}
                />
            </div>
            <div className={estilo.genre_movies}>
                <h3>
                    {movie.genre_names.map((genre, index) => (
                        <span key={index} className={estilo.genre}>{genre}</span>
                    ))}
                </h3>
            </div>
        </div>
    );
}
