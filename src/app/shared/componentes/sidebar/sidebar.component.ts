import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarGrupoAcoes } from '../../interfaces/sidebar-grupo-acoes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() name?: string;
  grupoAcoes: Array<SidebarGrupoAcoes> = []

  logout(){
    this.activeOffcanvas.dismiss('Cross click')
  }
}
