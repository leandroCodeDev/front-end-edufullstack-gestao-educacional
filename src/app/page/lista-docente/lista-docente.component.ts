import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { PhonePipe } from '../../shared/pipes/phone-pipe/phone.pipe';
import { Docente } from '../../shared/interfaces/docente';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';



@Component({
  selector: 'app-lista-docente',
  standalone: true,
  imports: [NavbarComponent,PhonePipe,ReactiveFormsModule,CommonModule],
  templateUrl: './lista-docente.component.html',
  styleUrl: './lista-docente.component.scss'
})
export class ListaDocenteComponent {
  docentes:Array<Docente> = []
  searchControl:FormGroup

  constructor(
    private router: Router,
    private docenteService: DocenteService,
    private notificacao:NotificacaoService,
    private location: Location
  ){
    
    this.getDocentes()

    this.searchControl = new FormGroup({
      search: new FormControl('')
    });
    
  }
  getDocentes(){
    this.docenteService.getDocentes().subscribe((response) => {
      this.docentes = response
    })
  }

  buscar(){
    const search = this.searchControl.value.search?.trim();
    if (search) {
      this.docenteService.getDocentes().subscribe((response) => {
        this.docentes = response.filter((aluno:Docente) => {
          return (aluno.nome && aluno.nome.toLowerCase().includes(search.toLowerCase()) || 
          aluno.telefone && aluno.telefone.includes(search) || 
          aluno.email && aluno.email.includes(search));
        })
        this.docentes.sort((a: any,b: any) => a.nome.localeCompare(b.nome));

        if (this.docentes.length === 0) {
          this.notificacao.showDanger("Não foram encontrados registros de docentes com este nome, e-mail ou telefone.");
        }else{
          this.notificacao.showSuccess("Busca de docentes realizada com sucesso");
        }
      })
      
    } else {
      this.docenteService.getDocentes().subscribe((response) => {
        this.docentes = response;
        this.docentes.sort((a: any,b: any) => a.nome.localeCompare(b.nome));
        this.notificacao.showSuccess("A lista de docentes foi recarregada.");
      });
    
    }
  }
  editarDocente(id: any) {
    this.router.navigate([`docentes/${id}/editar`]);
  }

  voltar(){
    this.location.back()
  }
}
