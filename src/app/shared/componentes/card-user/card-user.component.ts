import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhonePipe } from '../../pipes/phone-pipe/phone.pipe';
import { IdadePipe } from '../../pipes/idade/idade.pipe';


@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [PhonePipe, IdadePipe],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss'
})
export class CardUserComponent {
  @Output() clickCustom = new EventEmitter();
  @Input() idade!:string;
  @Input() nome!:string;
  @Input() telefone!:string;
  @Input() textoBotao!:string;


  clickBtn(){
    this.clickCustom.emit()
  }
}
