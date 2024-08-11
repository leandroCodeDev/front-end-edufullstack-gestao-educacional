import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { usuario } from '../../interfaces/usuario';
import { LoginStore } from '../../store/login/Login.store';
import { Router } from '@angular/router';
import { NotificacaoService } from '../notificacao/notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuarioLogado?: usuario;

  constructor(
    private usuarioService: UsuarioService,
    private loginStore: LoginStore,
    private router: Router,
    private notificacao:NotificacaoService
  ) { }

  login(usuario: { login: string, senha: string }) {
    this.usuarioService.checkloginUser(usuario.login, usuario.senha)
      .subscribe(
        (response) => {
          response = response.filter(item => (item.login == usuario.login || usuario.login == item.email )&& item.senha == usuario.senha)
          if (response.length > 0) {
            this.loginStore.save(response[0])
                if(this.loginStore.isAluno()){
                  this.router.navigate(
                    [`/alunos/${this.loginStore.get().id}`],
                  );
                }

                this.router.navigate(
                  ['/home'],
                );
                
          }else{
            this.notificacao.showDanger('Login ou senha incorreta')
          }
        }
      )
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
    this.router.navigate(
      ['/login'],
    );
  }
}
