import { Component } from '@angular/core';
import { PhonePipe } from '../../shared/pipes/phone-pipe/phone.pipe';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [NavbarComponent,PhonePipe,CommonModule],
  templateUrl: './notas-aluno.component.html',
  styleUrl: './notas-aluno.component.scss'
})
export class NotasAlunoComponent {
  avaliacoes = [
    { id: '1', nome: 'Prova de Matemática', data: '2024-07-31', materia: 'Matemática', nota: '9.5' },
    { id: '2', nome: 'Trabalho de História', data: '2024-07-30', materia: 'História', nota: '8.7' },
    { id: '3', nome: 'Teste de Geografia', data: '2024-07-29', materia: 'Geografia', nota: '7.8' },
    { id: '4', nome: 'Redação de Português', data: '2024-07-28', materia: 'Português', nota: '9.2' },
    { id: '5', nome: 'Experimento de Química', data: '2024-07-27', materia: 'Química', nota: '8.0' },
    { id: '6', nome: 'Simulado de Física', data: '2024-07-26', materia: 'Física', nota: '8.5' },
    { id: '7', nome: 'Projeto de Biologia', data: '2024-07-25', materia: 'Biologia', nota: '7.9' },
    { id: '8', nome: 'Ensaios de Filosofia', data: '2024-07-24', materia: 'Filosofia', nota: '9.1' },
    { id: '9', nome: 'Debate de Sociologia', data: '2024-07-23', materia: 'Sociologia', nota: '8.35' },
    { id: '10', nome: 'Avaliação de Educação Física', data: '2024-07-22', materia: 'Educação Física', nota: '10' }
  ];

}
