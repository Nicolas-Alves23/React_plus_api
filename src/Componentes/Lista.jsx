import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from './Card';
import { Modal } from './Modal';
import style from "./Lista.module.css";

const API_URL = 'https://api.themoviedb.org/3';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista() {
    const [movies, setMovies] = useState([])
    const [SelectedMovie, setSelectedMovie] = useState(null)


    //()parametros {}script de programação , []dependencias
    useEffect(() => {
        // Função para pegar os filmes e filtrar por descrição
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


                const allMovies = [
                    ...responses[0].data.results,
                    ...responses[1].data.results,
                    ...responses[2].data.results,
                    ...responses[3].data.results,
                    ...responses[4].data.results,
                    ...responses[5].data.results,
                    ...responses[6].data.results,
                    ...responses[7].data.results,
                    ...responses[8].data.results,
                ];


                // 👇 Adicione esta parte que estava faltando
                const moviesWithDescription = allMovies.filter(
                    movie => movie.overview && movie.overview.trim() !== ""
                );

                // Buscar gêneros
                const genreResponse = await axios.get(`${API_URL}/genre/movie/list?api_key=${API_key}&language=pt-BR`);
                const genres = genreResponse.data.genres;
                const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));

                // Substituir genre_ids por nomes
                const moviesWithGenres = moviesWithDescription.map(movie => ({
                    ...movie,
                    genre_names: movie.genre_ids.map(id => genreMap.get(id)).filter(Boolean)
                }));

                // Remover duplicatas
                const uniqueMovies = Array.from(new Map(moviesWithGenres.map(movie => [movie.id, movie])).values());

                setMovies(uniqueMovies);


                console.log(allMovies)
            } catch (error) {
                console.log('Erro ao carregar filmes', error);
            }
        };

        fetchMovies();
    }, []); // Apenas uma vez quando o componente é montado

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie)
    }

    const handleCloseModal = () => {
        setSelectedMovie(null)
    }


    return (
        <div>
            <figure>
                {movies.map(movie => (
                    <Card key={movie.id}
                        movie={movie}
                        onOpenModal={handleOpenModal}
                    />
                ))}
            </figure>
            {SelectedMovie && (<Modal movie={SelectedMovie} onClose={handleCloseModal} />)}
        </div>
    )

}