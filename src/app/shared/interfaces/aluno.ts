import { Endereco } from "./endereco";

export interface Aluno {
    "id"?: string,
    "nome": string,
    "telefone": string,
    "genero": string,
    "turma": string,
    "dataNascimento": string,
    "email": string,
    "senha": string,
    "cpf": string,
    "rg": string,
    "naturalidade": string,
    "endereco": Endereco
}
