import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  url = 'http://localhost:3000/notas';

  constructor(private httpClient: HttpClient) {}

  getNotas() {
    return this.httpClient.get<Array<Nota>>(this.url);
  }
  

  getNota(id: string) {
    return this.httpClient.get<Nota>(this.url + `/${id}`);
  }

  getNotasAluno(idAluno: string) {
    return this.httpClient.get<Array<Nota>>(this.url + `?aluno=${idAluno}`);
  }

  postNota(nota: Nota) {
    return this.httpClient.post<any>(this.url, nota);
  }

  putNota(nota: Nota) {
    return this.httpClient.put<any>(this.url + `/${nota.id}`, nota);
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
