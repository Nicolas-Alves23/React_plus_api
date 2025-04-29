import { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Card } from "./Card";
import { Modal } from "./Modal";
import axios from "axios";
import style from "./Lista.module.css";

const API_URL = 'https://api.themoviedb.org/3';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [apiLoaded, setApiLoaded] = useState(false); // API carregada
  const [timerDone, setTimerDone] = useState(false); // Tempo mínimo de loading concluído

  useEffect(() => {
    // Tempo fixo de loading (3 segundos)
    const timer = setTimeout(() => {
      setTimerDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Carregar filmes e tratar dados
    const fetchMovies = async () => {
      try {
        const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10 , 11 , 12];

        const requests = pageNumbers.map((page) =>
          axios.get(`${API_URL}/movie/popular?api_key=${API_key}&language=pt-BR&page=${page}`)
        );


        const responses = await Promise.all(requests);
        
        const allMovies = responses.flatMap(response => response.data.results);
        console.log(allMovies)

        // Filtrar filmes que possuem descrição
        const moviesWithDescription = allMovies.filter(
          movie => movie.overview && movie.overview.trim() !== ""
        );

        // Buscar gêneros
        const genreResponse = await axios.get(`${API_URL}/genre/movie/list?api_key=${API_key}&language=pt-BR`);
        const genres = genreResponse.data.genres;
        const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));

        // Substituir genre_ids por nomes dos gêneros
        const moviesWithGenres = moviesWithDescription.map(movie => ({
          ...movie,
          genre_names: movie.genre_ids.map(id => genreMap.get(id)).filter(Boolean)
        }));

        // Buscar trailer para cada filme
        const moviesWithTrailer = await Promise.all(
          moviesWithGenres.map(async (movie) => {
            try {
              const trailerResponse = await axios.get(`${API_URL}/movie/${movie.id}/videos?api_key=${API_key}&language=pt-BR`);
              const trailerData = trailerResponse.data.results.find(video => video.type === "Trailer");
              if (trailerData) {
                return {
                  ...movie,
                  trailerKey: trailerData.key
                };
              } else {
                return null; // Filme sem trailer
              }
            } catch (error) {
              console.log('Erro ao buscar trailer para filme:', movie.title);
              return null;
            }
          })
        );

        // Remover filmes sem trailer
        const finalMovies = moviesWithTrailer.filter(Boolean);

        // Remover duplicatas
        const uniqueMovies = Array.from(new Map(finalMovies.map(movie => [movie.id, movie])).values());

        setMovies(uniqueMovies);

        
      } catch (error) {
        console.log('Erro ao carregar filmes', error);
      } finally {
        setApiLoaded(true);
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

  // Enquanto a API não carregou ou o timer não terminou, mostra o Loading
  if (!apiLoaded || !timerDone) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <figure>
        {movies.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            onOpenModal={handleOpenModal}
          />
        ))}
      </figure>

      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
