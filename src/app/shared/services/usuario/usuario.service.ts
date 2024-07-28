import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {}

  getUsuarios() {
    return this.httpClient.get<Array<usuario>>(this.url);
  }

  checkloginUser(login: string,senha:string) {
    return this.httpClient.get<Array<usuario>>(this.url + `?login=${login}&senha=${senha}`);
  }

  getUsuario(id: string) {
    return this.httpClient.get<usuario>(this.url + `/${id}`);
  }

  postUsuario(usuario: usuario) {
    return this.httpClient.post<any>(this.url, usuario);
  }

  putUsuario(usuario: usuario) {
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
