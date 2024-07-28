import { Component, Input } from '@angular/core';
import { PhonePipe } from '../../pipes/phone-pipe/phone.pipe';


@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [PhonePipe],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss'
})
export class CardUserComponent {
  @Input() idade!:number;
  @Input() nome!:string;
  @Input() telefone!:string;
}
