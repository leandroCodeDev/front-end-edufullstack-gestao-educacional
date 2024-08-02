import { Endereco } from "./endereco";

export interface Docente {
    "id": string,
    "nome": string,
    "telefone": string,
    "genero": string,
    "estadoCivil": string,
    "dataNascimento": string,
    "email": string,
    "senha": string,
    "cpf": string,
    "rg": string,
    "naturalidade": string,
    "materias": string,
    "endereco": Endereco
}
