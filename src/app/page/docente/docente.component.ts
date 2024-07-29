import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.scss'
})
export class DocenteComponent {

}
