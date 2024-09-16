import { Component, Input } from '@angular/core';
import { Gif } from '../../services/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input()
  public gif!:Gif
}
