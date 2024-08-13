import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private url:string = 'https://viacep.com.br/ws';
  constructor(private httpClient: HttpClient) { }

  getEndereco(cep: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${this.url}/${cep}/json`, {headers: headers});
  };
}
