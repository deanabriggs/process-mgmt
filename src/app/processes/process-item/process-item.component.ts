import { Component, Input } from '@angular/core';
import { Process } from '../process.model';

@Component({
  selector: 'app-process-item',
  standalone: false,
  templateUrl: './process-item.component.html',
  styleUrl: './process-item.component.css'
})
export class ProcessItemComponent {
  @Input() process!: Process;
}
