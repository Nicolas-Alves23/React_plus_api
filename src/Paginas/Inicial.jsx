import { Inicio_perfis } from '../Componentes/Pagina_inicial/Inicio_perfis';
import { Cabecalho } from '../Componentes/Cabecalho';               
import { Outlet } from 'react-router-dom';

export function Inicial(){
    return(
        <>
        <Inicio_perfis/>
        </>
    )
}