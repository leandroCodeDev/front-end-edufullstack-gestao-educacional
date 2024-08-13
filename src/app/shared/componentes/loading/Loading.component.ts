import { Component, inject } from '@angular/core';


import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../services/loading/Loading.service';

@Component({
  selector: 'app-Loading',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl:'./Loading.component.html',
  styleUrl: './Loading.component.scss',
  host: {
    class: 'toast-container position-fixed',
    style: 'z-index: 1200; height: 100vh;width: 100vw;',
  },
})
export class LoadingContainer {
  LoadingService = inject(LoadingService);
}
