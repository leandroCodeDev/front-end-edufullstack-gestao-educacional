import { CommonModule } from '@angular/common';
import { Component, inject, Input} from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

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
  buttons = [
    {
      titulo:'Aluno',
      acoes:[
        {
        rota:'#',
        nome:'lista 0',
        visivel:true
      },{
        rota:'#',
        nome:'lista 1',
        visivel:false
      },{
        rota:'#',
        nome:'lista 2',
        visivel:true
      },{
        rota:'#',
        nome:'lista 3',
        visivel:true
      },{
        rota:'#',
        nome:'lista 4',
        visivel:true
      }
    ]
    },
    {
      titulo:'Professor'
    },
    {
      
      acoes:[
        {
        rota:'#',
        nome:'lista 0',
        visivel:true
      },{
        rota:'#',
        nome:'lista 1',
        visivel:false
      },{
        rota:'#',
        nome:'lista 2',
        visivel:true
      },{
        rota:'#',
        nome:'lista 3',
        visivel:true
      },{
        rota:'#',
        nome:'lista 4',
        visivel:true
      }
    ]
    }
  ]
  
}
