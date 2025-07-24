import { Component, Input } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-item',
  standalone: false,
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
  @Input() project!: Project;
}
