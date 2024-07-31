import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { CardUserComponent } from '../../shared/componentes/card-user/card-user.component';
import { CardContadorComponent } from '../../shared/componentes/card-contador/card-contador.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardUserComponent, CardContadorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  estatisticas = [
    { contador: 50, titulo: "teste 1" },
    { contador: 50, titulo: "teste 1" },
    { contador: 50, titulo: "teste 1" },
    { contador: 50, titulo: "teste 1" },
    
  ]

  pessoas = [
    { idade: 31, nome: 'Leandro', telefone: '48-999011032' },
    { idade: 28, nome: 'Maria', telefone: '48-998765432' },
    { idade: 45, nome: 'Carlos', telefone: '48-997654321' },
    { idade: 36, nome: 'Ana', telefone: '48-996543210' },
    { idade: 22, nome: 'Pedro', telefone: '48-995432109' },
    { idade: 30, nome: 'Julia', telefone: '48-994321098' },
    { idade: 40, nome: 'Marcos', telefone: '48-993210987' },
    { idade: 34, nome: 'Paula', telefone: '48-992109876' },
    { idade: 29, nome: 'Ricardo', telefone: '48-991098765' },
    { idade: 33, nome: 'Fernanda', telefone: '48-990987654' }
  ];

}
