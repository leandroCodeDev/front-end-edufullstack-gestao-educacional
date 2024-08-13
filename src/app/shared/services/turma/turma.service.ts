import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turma } from '../../interfaces/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  url = 'http://localhost:3000/turmas';

  constructor(private httpClient: HttpClient) {}

  getTurmas() {
    return this.httpClient.get<Array<Turma>>(this.url);
  }


  getTurma(id: string) {
    return this.httpClient.get<Turma>(this.url + `/${id}`);
  }

  postTurma(turma: Turma) {
    return this.httpClient.post<any>(this.url, turma);
  }

  putTurma(turma: Turma) {
    return this.httpClient.put<any>(this.url + `/${turma.id}`, turma);
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
