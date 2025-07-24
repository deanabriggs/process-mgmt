import { EventEmitter, Injectable } from '@angular/core';
import { Project } from './project.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectSelectedEvent = new EventEmitter<Project>();
  projectsChangedEvent = new Subject<Project[]>();
  projects: Project[] = [];
  maxProjectId: number;

  constructor(private http: HttpClient) { }

    private getMaxId(): number {
    let maxId = 0;
    for (let project of this.projects) {
      let currentId = +project.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  getProjects() {
    if (this.projects.length > 0) {
      this.projectsChangedEvent.next(this.projects.slice());
      return;
    }

    this.http.get<Project[]>('https://localhost:3000/projects')
      .subscribe(
        (projects: Project[]) => {
          this.projects = projects;
          this.maxProjectId = this.getMaxId();
          this.projects.sort((a, b) => a.title.localeCompare(b.title));
          this.projectsChangedEvent.next(this.projects.slice());
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
  }

  getProject(id: string): Project | null {
    for (let project of this.projects) {
      if (project.id.toString() === id || project._id.toString() === id) {
        return project;
      }
    }
  }

  addProject(newProject: Project) {
    if (!newProject) {
      return;
    }
    newProject._id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: string, project: Project}>('https://localhost:3000/projects', newProject, { headers: headers })
      .subscribe(
        (responseData) => {
          this.projects.push(responseData.project);
          this.projectsChangedEvent.next(this.projects.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }  
      );
  }

  updateProjects(originalProject: Project, updatedProject: Project) {
    if (!originalProject || !updatedProject) {
      return;
    }

    const index = this.projects.indexOf(originalProject);
    if (index < 0) {
      return;
    }

    updatedProject._id = originalProject._id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put<{message: string, project: Project}>('https://localhost:3000/projects/' + originalProject._id, updatedProject, { headers: headers })
      .subscribe(
        (responseData) => {
          this.projects[index] = responseData.project;
          this.projectsChangedEvent.next(this.projects.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  deleteProject(project: Project) {
    if (!project) {
      return;
    }

    const index = this.projects.indexOf(project);
    if (index < 0) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete('https://localhost:3000/projects/' + project._id, { headers: headers })
      .subscribe(
        () => {
          this.projects.splice(index, 1);
          this.projectsChangedEvent.next(this.projects.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  

}
