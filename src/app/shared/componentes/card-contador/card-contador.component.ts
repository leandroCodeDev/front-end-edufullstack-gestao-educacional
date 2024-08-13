import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card-contador',
  standalone: true,
  imports: [],
  templateUrl: './card-contador.component.html',
  styleUrl: './card-contador.component.scss'
})
export class CardContadorComponent {
  @Input() contador!:number;
  @Input() titulo!:string;
}
