import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSelectedEvent = new EventEmitter<Task>();
  tasksChangedEvent = new Subject<Task[]>();
  tasks: Task[] = [];
  maxTaskId: number;

  constructor(private http: HttpClient) { }

    private getMaxId(): number {
    let maxId = 0;
    for (let task of this.tasks) {
      let currentId = +task.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  getTasks() {
    if (this.tasks.length > 0) {
      this.tasksChangedEvent.next(this.tasks.slice());
      return;
    }

    this.http.get<Task[]>('http://localhost:3000/tasks')
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
          this.maxTaskId = this.getMaxId();
          this.tasks.sort((a, b) => a.title.localeCompare(b.title));
          this.tasksChangedEvent.next(this.tasks.slice());
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
  }

  getTask(id: string): Task | null {
    for (let task of this.tasks) {
      if (task.id.toString() === id || task._id.toString() === id) {
        return task;
      }
    }
  }

  addTask(newTask: Task) {
    if (!newTask) {
      return;
    }
    newTask._id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: string, task: Task}>('http://localhost:3000/tasks', newTask, { headers: headers })
      .subscribe(
        (responseData) => {
          this.tasks.push(responseData.task);
          this.tasksChangedEvent.next(this.tasks.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }  
      );
  }

  updateTasks(originalTask: Task, updatedTask: Task) {
    if (!originalTask || !updatedTask) {
      return;
    }

    const index = this.tasks.indexOf(originalTask);
    if (index < 0) {
      return;
    }

    updatedTask._id = originalTask._id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put<{message: string, task: Task}>('http://localhost:3000/tasks/' + originalTask._id, updatedTask, { headers: headers })
      .subscribe(
        (responseData) => {
          this.tasks[index] = responseData.task;
          this.tasksChangedEvent.next(this.tasks.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  deleteTask(task: Task) {
    if (!task) {
      return;
    }

    const index = this.tasks.indexOf(task);
    if (index < 0) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete('http://localhost:3000/tasks/' + task._id, { headers: headers })
      .subscribe(
        () => {
          this.tasks.splice(index, 1);
          this.tasksChangedEvent.next(this.tasks.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
