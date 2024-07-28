import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/componentes/navbar/navbar.component';
import { CardContadorComponent } from './shared/componentes/card-contador/card-contador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardContadorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-end-edufullstack-gestao-educacional';
}
