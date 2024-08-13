import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginStore } from '../../store/login/Login.store';
import { usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuTitulo:string = 'LABPCP'
  private offcanvasService = inject(NgbOffcanvas);
  usuarioLogado!:usuario

  constructor(
    private loginStore:LoginStore
  ){
    this.usuarioLogado = loginStore.get()
  }

	open() {
		const offcanvasRef = this.offcanvasService.open(SidebarComponent);

	}

}
