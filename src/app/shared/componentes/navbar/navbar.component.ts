import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
  
	open() {
		const offcanvasRef = this.offcanvasService.open(SidebarComponent);
		offcanvasRef.componentInstance.name = 'World';
	}

}
