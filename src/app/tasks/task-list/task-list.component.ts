import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
private subscription: Subscription;
  tasks: Task[] = [];
  term: string;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {  
    this.subscription = this.taskService.tasksChangedEvent
      .subscribe((tsk: Task[]) => {
        this.tasks = tsk;
      })

    this.taskService.getTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
