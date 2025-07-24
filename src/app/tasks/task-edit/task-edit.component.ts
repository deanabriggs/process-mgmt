import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service'; // Assuming you have a
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  standalone: false,
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  originalTask: Task;
  task: Task;
  editMode: boolean = false;
  id: string;
  dropInvalid: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
   ) {}

  ngOnInit(): void {this.route.params
      .subscribe(
        (params: Params) => {
          if(!params.id) {
            this.editMode = false;
            return;
          }
          this.originalTask = this.taskService.getTask(params.id);

          if(!this.originalTask) {
            return;
          }
          this.editMode = true;
          this.task = JSON.parse(JSON.stringify(this.originalTask));
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let task = new Task(
      "0",
      value.title,
      value.completed || false,
      value.dueDate ? new Date(value.dueDate) : undefined,
      value.assignedTo || null,
    );

    if(this.editMode == true) {
      this.taskService.updateTasks(this.originalTask, task);
    } else {
      this.taskService.addTask(task);
    };
    this.editMode = false;
    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }

  isInvalidTask(newTask: Task) {
    if(!newTask) {
      return true;
    }
    if(this.task && newTask.id === this.task.id) {
      return true;
    }

    return false;
  }

  addToGroup(event: CdkDragDrop<Task[]>) {
    const selectedTask: Task = event.item.data;
    if(this.isInvalidTask(selectedTask)) {
      this.dropInvalid = true;
      setTimeout(() => {
        this.dropInvalid = false;
      }, 3000);
      return;
    }
  }
}
