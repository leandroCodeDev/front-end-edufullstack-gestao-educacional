import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.scss'
})
export class NotaComponent {

}
