import estilo from './Modal.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'https://api.themoviedb.org/3';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Modal({ movie, onClose }) {
    const [trailer, setTrailer] = useState(null); // Estado para armazenar o trailer

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await axios.get(`${API_URL}/movie/${movie.id}/videos?api_key=${API_key}&language=pt-BR`);
                const trailerData = response.data.results.find(video => video.type === "Trailer");
                if (trailerData) {
                    setTrailer(trailerData.key); // Armazenar a chave do trailer
                } else {
                    setTrailer(null);
                }
            } catch (error) {
                console.log('Erro ao buscar trailer', error);
            }
        };

        fetchTrailer();
    }, [movie.id]);

    if (!movie) {
        return null;
    }

    return (
        <div className={estilo.modalback}>
            <div className={estilo.modalConteiner}>
                <div className={estilo.modalheader}>
                    <h2>{movie.title}</h2>
                    <button onClick={onClose}>X</button>
                    <img
                        className={estilo.imgmodal}
                        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div className={estilo.imgdetalhes}>
                        <p>{movie.overview}</p>
                        <ul>
                            <li>{`Popularidade: ${movie.popularity}`}</li>
                            <li>{`Data de Lançamento: ${movie.release_date}`}</li>
                            <li>{`Quantidade de Votos: ${movie.vote_count}`}</li>
                        </ul>

                        {trailer ? (
                            <div>
                                <h3>Trailer</h3>
                                {/* Exibe o trailer incorporado usando iframe */}
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${trailer}`}
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
        </div>
    );
}
