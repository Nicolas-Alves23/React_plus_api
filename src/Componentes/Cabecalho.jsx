import estilo from './Cabecalho.module.css';
import video from '../img/trailer/trailer.mp4'

export function Cabecalho() {
    return (
        <header className={estilo.conteiner_header}>
            <h1 className={estilo.linear_gradient_in_text}>
                NICFLIX
            </h1>
        </header>

    )

}