import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoExtra } from '../../interfaces/curso-extra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoExtraServiceService {

  url = 'http://localhost:3000/cursosExtras';

  constructor(private httpClient: HttpClient) {}

  getCursosExtras():Observable<Array<CursoExtra>> {
    return this.httpClient.get<Array<CursoExtra>>(this.url);
  }
}
