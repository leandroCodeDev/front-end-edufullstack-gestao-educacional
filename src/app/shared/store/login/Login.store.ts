import { Injectable } from '@angular/core';
import { usuario } from '../../interfaces/usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStore {
  usuario:BehaviorSubject<usuario>;

  constructor() {
    let valor = sessionStorage.getItem('usuarioLogado')
    let user:usuario = valor == null ? {id:'',login:'',email:'',perfil:'',senha:''} : JSON.parse(valor);
    this.usuario = new BehaviorSubject<usuario>(user); 
  } 
  
  get(){
    return this.usuario.getValue()
  }

  save(usuarioLogado: usuario){
    this.usuario.next(usuarioLogado);
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
  }

  delete(){
    sessionStorage.removeItem('usuarioLogado');
    this.usuario.next({id:'',login:'',perfil:'',email:'',senha:''});
  }
}
