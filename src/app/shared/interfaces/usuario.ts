import { PerfilEnum } from "../enums/perfil/perfil-enum";

export interface usuario {
    id: string;
    nome:string;
    login:string;
    email:string;
    senha:string;
    perfil:string;
    
}
