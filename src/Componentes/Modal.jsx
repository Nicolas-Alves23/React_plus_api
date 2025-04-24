import estilo from './Modal.module.css'

export function Modal({ movie , onClose}) {
    if (!movie){
        return null;
    }
    console.log(movie);


    return (
        <div className={estilo.modalback}>

            <div className={estilo.modalConteiner}>
                <div className={estilo.modalheader}>
                    <h2>{movie.title}</h2>
                    <button onClick={onClose}>X</button>
                    <img  className= {estilo.imgmodal} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <div className={estilo.imgdetalhes}>
                    <p>{movie.overview}</p>
                        <ul>
                            <li>{`Popularidade : ${movie.popularity}`}</li>
                            <li>{`Data de Lançamento : ${movie.release_date}`}</li>
                            <li>{`Quantidade de Votos: ${movie.vote_count}`}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}