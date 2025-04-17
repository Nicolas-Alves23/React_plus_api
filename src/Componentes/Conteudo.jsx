import estilo from './Conteudo.module.css';
import { Lista } from './Lista';

export function Conteudo(){
    return(
        <main className={estilo.conteiner}>
            
            <Lista />
        </main>
    )


}