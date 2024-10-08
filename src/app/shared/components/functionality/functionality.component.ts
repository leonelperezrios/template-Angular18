import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-functionality',
  standalone: true,
  imports: [],
  templateUrl: './functionality.component.html',
  styleUrl: './functionality.component.scss'
})
export class FunctionalityComponent {
    @Input() functionality: any;
}
