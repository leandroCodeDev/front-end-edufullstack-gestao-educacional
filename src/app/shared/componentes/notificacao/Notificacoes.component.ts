import { Component, inject } from '@angular/core';


import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl:'./notificacao.component.html',
  host: {
    class: 'toast-container position-fixed bottom-0 star-0 p-3',
    style: 'z-index: 1200',
  },
})
export class NotificacoesContainer {
  NotificacaoService = inject(NotificacaoService);
}
