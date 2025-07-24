import { EventEmitter, Injectable } from '@angular/core';
import { Process } from './process.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class ProcesseService {
  
  processeselectedEvent = new EventEmitter<Process>();
  processChangedEvent = new Subject<Process[]>();
  processes: Process[] = [];
  maxprocessId: number;

  constructor(private http: HttpClient) { }

  private getMaxId(): number {
    let maxId = 0;
    for (let process of this.processes) {
      let currentId = +process.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  getProcesses() {
      if (this.processes.length > 0) {
        this.processChangedEvent.next(this.processes.slice());
        return;
      }
  
      this.http.get<Process[]>('https://localhost:3000/processes')
        .subscribe(
          (processes: Process[]) => {
            this.processes = processes;
            this.maxprocessId = this.getMaxId();
            this.processes.sort((a, b) => a.title.localeCompare(b.title));
            this.processChangedEvent.next(this.processes.slice());
          },
          (error) => {
            console.error('Error fetching processes:', error);
          }
        );
    }
  
    getProcess(id: string): Process | null {
      for (let process of this.processes) {
        if (process.id.toString() === id || process._id.toString() === id) {
          return process;
        }
      }
    }
  
    addProcess(newProcess: Process) {
      if (!newProcess) {
        return;
      }
      newProcess._id = '';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      this.http.post<{message: string, process: Process}>('https://localhost:3000/processes', newProcess, { headers: headers })
        .subscribe(
          (responseData) => {
            this.processes.push(responseData.process);
            this.processChangedEvent.next(this.processes.slice());
          },
          // error method
          (error: any) => {
            console.error(error);
          }  
        );
    }
  
    updateProcesses(originalProcess: Process, updatedProcess: Process) {
      if (!originalProcess || !updatedProcess) {
        return;
      }
  
      const index = this.processes.indexOf(originalProcess);
      if (index < 0) {
        return;
      }
  
      updatedProcess._id = originalProcess._id;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      this.http.put<{message: string, process: Process}>('https://localhost:3000/processes/' + originalProcess._id, updatedProcess, { headers: headers })
        .subscribe(
          (responseData) => {
            this.processes[index] = responseData.process;
            this.processChangedEvent.next(this.processes.slice());
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  
    deleteprocess(process: Process) {
      if (!process) {
        return;
      }
  
      const index = this.processes.indexOf(process);
      if (index < 0) {
        return;
      }
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete('https://localhost:3000/processes/' + process._id, { headers: headers })
        .subscribe(
          () => {
            this.processes.splice(index, 1);
            this.processChangedEvent.next(this.processes.slice());
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
}
