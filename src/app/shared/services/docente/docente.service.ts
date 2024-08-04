import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docente } from '../../interfaces/docente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  url = 'http://localhost:3000/docentes';

  constructor(private httpClient: HttpClient) {}

  getDocentes():Observable<Array<Docente>> {
    return this.httpClient.get<Array<Docente>>(this.url);
  }

  checkloginUser(login: string,senha:string) {
    return this.httpClient.get<Array<Docente>>(this.url + `?login=${login}&senha=${senha}`);
  }

  getDocente(id: string) {
    return this.httpClient.get<Docente>(this.url + `/${id}`,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  postDocente(docente: Docente) {
    return this.httpClient.post<any>(this.url, docente,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  putDocente(docente: Docente) {
    return this.httpClient.put<any>(this.url + `/${docente.id}`, docente,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
