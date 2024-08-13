import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../../interfaces/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = 'http://localhost:3000/alunos';

  constructor(private httpClient: HttpClient) {}

  getAlunos() {
    return this.httpClient.get<Array<Aluno>>(this.url);
  }

  checkloginUser(login: string,senha:string) {
    return this.httpClient.get<Array<Aluno>>(this.url + `?login=${login}&senha=${senha}`);
  }

  getAluno(id: string) {
    return this.httpClient.get<Aluno>(this.url + `/${id}`);
  }

  postAluno(aluno: Aluno) {
    return this.httpClient.post<any>(this.url, aluno);
  }

  putAluno(aluno: Aluno) {
    return this.httpClient.put<any>(this.url + `/${aluno.id}`, aluno);
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
