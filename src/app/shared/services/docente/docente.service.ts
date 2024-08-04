import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docente } from '../../interfaces/docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  url = 'http://localhost:3000/docentes';

  constructor(private httpClient: HttpClient) {}

  getDocentes() {
    return this.httpClient.get<Array<Docente>>(this.url);
  }

  checkloginUser(login: string,senha:string) {
    return this.httpClient.get<Array<Docente>>(this.url + `?login=${login}&senha=${senha}`);
  }

  getDocente(id: string) {
    return this.httpClient.get<Docente>(this.url + `/${id}`);
  }

  postDocente(docente: Docente) {
    return this.httpClient.post<any>(this.url, docente);
  }

  putDocente(docente: Docente) {
    return this.httpClient.put<any>(this.url + `/${docente.id}`, docente);
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
