import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/componentes/navbar/navbar.component';
import { LoginComponent } from './page/login/login.component';
import { NotificacoesContainer } from './shared/componentes/notificacao/Notificacoes.component';
import { CommonModule } from '@angular/common';
import { usuarioLogadoGuard } from './shared/guards/usuario/usuario-logado.guard';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NotificacoesContainer,LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isGuest= false
  title = 'front-end-edufullstack-gestao-educacional';
   
  
}
