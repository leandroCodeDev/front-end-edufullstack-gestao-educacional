import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../../interfaces/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  url = 'http://localhost:3000/materias';

  constructor(private httpClient: HttpClient) {}


  getMaterias() {
    return this.httpClient.get<Array<Materia>>(this.url);
  }
}
