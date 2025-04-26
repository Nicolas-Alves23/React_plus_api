import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from './Card';
import { Modal } from './Modal';
import style from "./Lista.module.css";
import { Loading } from "./Loading";
import { motion } from 'framer-motion';

const API_URL = 'https://api.themoviedb.org/3';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista() {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=1`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=2`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=3`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=4`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=5`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=6`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=7`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=8`),
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=9`)
                ]);

                const allMovies = responses.flatMap(response => response.data.results);

                const moviesWithDescription = allMovies.filter(
                    movie => movie.overview && movie.overview.trim() !== ""
                );

                const genreResponse = await axios.get(`${API_URL}/genre/movie/list?api_key=${API_key}&language=pt-BR`);
                const genres = genreResponse.data.genres;
                const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));

                const moviesWithGenres = moviesWithDescription.map(movie => ({
                    ...movie,
                    genre_names: movie.genre_ids.map(id => genreMap.get(id)).filter(Boolean)
                }));

                const uniqueMovies = Array.from(new Map(moviesWithGenres.map(movie => [movie.id, movie])).values());

                setMovies(uniqueMovies);

            } catch (error) {
                console.log('Erro ao carregar filmes', error);
            } finally {
                setIsLoading(false); // SÓ AQUI libera a tela
            }
        };

        fetchMovies();
    }, []);

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <motion.div 
            initial= {{opacity: 0 , scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            >
            <figure>
                {movies.map(movie => (
                    <Card key={movie.id}
                        movie={movie}
                        onOpenModal={handleOpenModal}
                    />
                ))}
            </figure>

            {selectedMovie && (
                <Modal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </motion.div>
    );
}
