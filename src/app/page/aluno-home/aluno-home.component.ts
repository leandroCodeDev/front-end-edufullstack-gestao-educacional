import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/componentes/navbar/navbar.component";
import { NotaService } from '../../shared/services/nota/nota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { CommonModule, Location } from '@angular/common';
import { Nota } from '../../shared/interfaces/nota';
import { MateriaService } from '../../shared/services/materia/materia.service';
import { Materia } from '../../shared/interfaces/materia';
import { CursoExtraServiceService } from '../../shared/services/cursoExtra/curso-extra-service.service';
import { CursoExtra } from '../../shared/interfaces/curso-extra';
import { LoadingService } from '../../shared/services/loading/Loading.service';
import { DateFormatPipe } from '../../shared/pipes/dateFormat/date-format.pipe';

interface HasId {
  id: number;
}

@Component({
  selector: 'app-aluno-home',
  standalone: true,
  imports: [NavbarComponent,CommonModule,DateFormatPipe],
  templateUrl: './aluno-home.component.html',
  styleUrl: './aluno-home.component.scss'
})
export class AlunoHomeComponent {

  notas:Array<Nota> = []
  alunoId:string|null = null;
  materiaMock:Array<Materia> = []
  cursoMock:Array<CursoExtra> = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private notaService: NotaService,
    private materiaService: MateriaService,
    private cursoExtraService: CursoExtraServiceService,
    private notificacao: NotificacaoService,
    private location: Location,
    private router: Router,
    private loadingService:LoadingService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.alunoId = parameters['id']
      if (this.alunoId) {
        this.notasRequest(this.alunoId)
        this.mockMaterias()
        this.mockCursoExtra()
      } else {
        this.notificacao.showDanger('Varifique se o dados de acesso estão corretas')
        this.location.back();
      }
    })
  }


  notasRequest(alunoId:string){
    this.notaService.getTresUltimasNotasAluno(alunoId).subscribe((response) =>{
      this.notas = response.data
    })
  }


  notaAluno(alunoId:string){
    this.loadingService.showLoading()
    setTimeout(() => {
    this.router.navigate([`alunos/${alunoId}/notas`]);
  },1000)
  }

  private mockMaterias(){
    this.materiaService.getMaterias().subscribe((response) =>{
      let limite = (response.length < 3)?response.length:3;
      this.materiaMock = this.sortArrayById(this.getRandomUniqueElements(response, limite))      
    })
  }

  private mockCursoExtra(){
    this.cursoExtraService.getCursosExtras().subscribe((response) =>{
      let limite = (response.length < 6)?response.length:5;
      this.cursoMock = this.sortArrayById(this.getRandomUniqueElements(response, limite))      
    })
  }


  private getRandomUniqueElements(arr:Array<any>, x:number) {
    if (x > arr.length) {
        throw new Error("x não pode ser maior que o número de elementos no array");
    }

    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, x);
  }

  private sortArrayById<T extends HasId>(arr: T[]): T[] {
    return arr.sort((a, b) => a.id - b.id);
  }

}
