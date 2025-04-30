import estilo from './Modal_serie.module.css';

export function Modal_serie({ serie, onClose }) {
    if (!serie) {
        return null;
    }

    return (
        <div className={estilo.modalback}>
            <div className={estilo.modalConteiner}>
                <div className={estilo.modalheader}>
                    <button onClick={onClose}>X</button>

                    {serie.trailerKey ? (
                        <div>
                            <iframe
                                width="100%"
                                height="700px"
                                src={`https://www.youtube.com/embed/${serie.trailerKey}?autoplay=1`}
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
                <div className={estilo.numbers_about_film}>
                    <div className={estilo.text_in_modal}>
                        <h2>Opinião do Pública</h2>
                        <p className={estilo.numbers}>{serie.vote_average}</p>
                    </div>
                    <div className={estilo.text_in_modal}>
                        <h2>Quantidade de Votos</h2>
                        <p className={estilo.numbers}>{serie.vote_count}</p>
                    </div>
                    <div className={estilo.text_in_modal}>
                        <h2>Popularidade</h2>
                        <p className={estilo.numbers}>{serie.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
