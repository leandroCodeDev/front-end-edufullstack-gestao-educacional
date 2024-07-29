import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  user = {
    login: '',
    senha: ''
  };


  constructor(
    private loginService: LoginService,
    private noticacao:NotificacaoService
  ) { }

  entrar() {
    if (this.user.login && this.user.senha) {
        this.loginService.login(this.user)
    } else {
      this.noticacao.showDanger('Por favor, preencha os campos: Login e Senha')
    }
  }

  cadastrar() {
    this.noticacao.showDefault('Função não implementada!')
  }
  RecurarSenha(){
    
  }
}
