import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { PhonePipe } from '../../shared/pipes/phone-pipe/phone.pipe';



@Component({
  selector: 'app-lista-docente',
  standalone: true,
  imports: [NavbarComponent,PhonePipe],
  templateUrl: './lista-docente.component.html',
  styleUrl: './lista-docente.component.scss'
})
export class ListaDocenteComponent {
  pessoas = [
    { id: '31', nome: 'Leandro', telefone: '48-999011032' },
    { id: '28', nome: 'Maria', telefone: '48-998765432' },
    { id: '45', nome: 'Carlos', telefone: '48-997654321' },
    { id: '36', nome: 'Ana', telefone: '48-996543210' },
    { id: '22', nome: 'Pedro', telefone: '48-995432109' },
    { id: '30', nome: 'Julia', telefone: '48-994321098' },
    { id: '40', nome: 'Marcos', telefone: '48-993210987' },
    { id: '34', nome: 'Paula', telefone: '48-992109876' },
    { id: '29', nome: 'Ricardo', telefone: '48-991098765' },
    { id: '33', nome: 'Fernanda', telefone: '48-990987654' }
  ];

}
