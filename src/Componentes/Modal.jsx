import estilo from './Modal.module.css';

export function Modal({ movie, onClose }) {
    if (!movie) {
        return null;
    }

    return (
        <div className={estilo.modalback}>
            <div className={estilo.modalConteiner}>
                <div className={estilo.modalheader}>
                    <button onClick={onClose}>X</button>

                    {movie.trailerKey ? (
                        <div>
                            <iframe
                                width="100%"
                                height="700px"
                                src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`}
                                title="Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <p>Trailer não disponível.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
