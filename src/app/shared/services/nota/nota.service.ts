import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../../interfaces/nota';
import { NotasPaginadas } from '../../interfaces/notas-paginadas';

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

  getTresUltimasNotasAluno(idAluno: string) {
    return this.httpClient.get<NotasPaginadas>(this.url + `?aluno=${idAluno}&_sort=-id&_page=1&_per_page=3`);
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
