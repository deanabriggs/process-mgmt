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
          console.log('Fetched tasks:', tasks);
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

  updateTasks(originalTask: Task, newTask: Task) {
    if((!originalTask || !newTask)) {
      return;
    }
    const pos = this.tasks.findIndex(t => t.id === originalTask.id);
    if(pos < 0){
      return;
    }
    newTask.id = originalTask.id;
    newTask._id = originalTask._id; // Ensure the MongoDB _id is preserved

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/tasks/' + originalTask.id, newTask, { headers: headers })  
      .subscribe(
        () => {
          this.tasks[pos] = newTask;
          this.tasksChangedEvent.next(this.tasks.slice());
        }
      );
  }

  deleteTask(task: Task) {
    if(!task) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.delete('http://localhost:3000/tasks/' + task.id, { headers: headers })
      .subscribe(() => {
        const pos = this.tasks.indexOf(task);
        if (pos < 0) {
          return;
      }
      this.tasks.splice(pos, 1);
      this.tasksChangedEvent.next(this.tasks.slice());
      },
      (error: any) => {
        console.error(error);
      });
  }
}
