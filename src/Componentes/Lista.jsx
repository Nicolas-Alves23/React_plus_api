import axios from "axios";
import React, {useState, useEffect} from "react";
import { Card } from './Card';
import { Modal } from './Modal';

const API_URL = 'https://api.themoviedb.org/3';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista(){
    const[movies, setMovies] = useState([]);
    const[SelectedMovie , setSelectedMovie] = useState(null)


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
                    axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=6`)
                ]);

                // Junta os resultados das 2 páginas
                const allMovies = [
                    ...responses[0].data.results,
                    ...responses[1].data.results,
                    ...responses[2].data.results,
                    ...responses[3].data.results,
                    ...responses[4].data.results,
                    ...responses[5].data.results,
                ];

                // Filtra apenas os filmes que possuem descrição
                const moviesWithDescription = allMovies.filter(movie => movie.overview && movie.overview.trim() !== "");

                setMovies(moviesWithDescription); // Atualiza o estado com filmes que possuem descrição
            } catch (error) {
                console.log('Erro ao carregar filmes', error);
            }
        };

        fetchMovies();
    }, []); // Apenas uma vez quando o componente é montado

const handleOpenModal = (movie) =>{
    setSelectedMovie(movie)
}

const handleCloseModal = ()=>{
    setSelectedMovie(null)
}


    return(
        <div>
            <figure>
                {movies.map(movie=>(
                    <Card key={movie.id}
                    movie={movie}
                    onOpenModal = {handleOpenModal}
                    />
                ))}
            </figure>
            {SelectedMovie &&(<Modal movie = {SelectedMovie} onClose = {handleCloseModal}/>)}
        </div>
    )

}