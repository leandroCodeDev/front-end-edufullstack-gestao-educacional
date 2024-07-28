import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/componentes/navbar/navbar.component';
import { LoginComponent } from './page/login/login/login.component';
import { NotificacoesContainer } from './shared/componentes/notificacao/Notificacoes.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NotificacoesContainer,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isGuest= false
  title = 'front-end-edufullstack-gestao-educacional';
  
}
