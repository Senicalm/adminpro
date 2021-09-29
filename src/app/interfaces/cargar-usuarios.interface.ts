import { Usuario } from '../models/usuario.model';
export interface CargarUsuarios{
    total:number;
    usuarios:Usuario[];
    backPage:number;
    actualPage:number;
    nextPage:number;
    limit:number;
    totalPages:number;
}