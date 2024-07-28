import { PerfilEnum } from "../enums/perfil/perfil-enum";

export interface usuario {
    id: string;
    login:string;
    senha:string;
    perfil?:PerfilEnum;
    
}
