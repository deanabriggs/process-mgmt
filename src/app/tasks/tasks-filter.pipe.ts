import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'tasksFilter',
  standalone: false
})
export class TasksFilterPipe implements PipeTransform {
  
  transform(tasks: Task[], term: string): any {
    let filtered: Task[] = [];

    if (term && term.length >0) {
      filtered = tasks.filter(
        (task: Task) => task.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    if(filtered.length < 1) {
      return tasks;
    }

    return filtered;
  }
}
