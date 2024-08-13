import { Component } from '@angular/core';
import { PhonePipe } from '../../shared/pipes/phone-pipe/phone.pipe';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaService } from '../../shared/services/materia/materia.service';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { AlunoService } from '../../shared/services/aluno/aluno.service';
import { Aluno } from '../../shared/interfaces/aluno';
import { Turma } from '../../shared/interfaces/turma';
import { Nota } from '../../shared/interfaces/nota';
import { NotaService } from '../../shared/services/nota/nota.service';
import { TurmaService } from '../../shared/services/turma/turma.service';
import { DateFormatPipe } from '../../shared/pipes/dateFormat/date-format.pipe';
import { CpfFormatPipe } from '../../shared/pipes/cpfFormat/cpf-format.pipe';
import { LoadingService } from '../../shared/services/loading/Loading.service';
@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [NavbarComponent, PhonePipe, CommonModule, DateFormatPipe, CpfFormatPipe],
  templateUrl: './notas-aluno.component.html',
  styleUrl: './notas-aluno.component.scss'
})
export class NotasAlunoComponent {
  aluno?: Aluno;
  turma?: Turma;
  notas: Array<Nota> = []


  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private materiaService: MateriaService,
    private turmaService: TurmaService,
    private notaService: NotaService,
    private activatedRoute: ActivatedRoute,
    private notificacao: NotificacaoService,
    private location: Location,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      let alunoId = parameters['id'];
      if (alunoId) {
        this.alunoService.getAluno(alunoId).subscribe((response) => {
          this.aluno = response
          if (this.aluno.id) {
            this.notasRequest(this.aluno.id)
            this.turmaRequest(this.aluno.turma)
          }
          this.notificacao.showSuccess('Dados Carregado com sucesso')
        })
      } else {
        this.notificacao.showSuccess('Verifique seus dados de acesso')
        this.location.back();
      }
    });
  };


  notasRequest(alunoId: string) {
    this.notaService.getNotasAluno(alunoId).subscribe((response) => {
      this.notas = response
    })
  }

  turmaRequest(turmaId: string) {
    this.turmaService.getTurma(turmaId).subscribe((response) => {
      this.turma = response
    })
  }
  voltar() {
    this.loadingService.showLoading()
    setTimeout(() => {
      this.location.back()
    }, 1000)
  }
}
