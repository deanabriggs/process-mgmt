import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProcessesComponent } from './processes/processes.component';
import { ProcessEditComponent } from './processes/process-edit/process-edit.component';
import { ProcessDetailComponent } from './processes/process-detail/process-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

const routes: Routes = [
  {path: '',  redirectTo: '/projects', pathMatch: 'full'},
  {path: 'projects', component: ProjectsComponent, children: [
    {path: 'new', component: ProjectEditComponent},
    {path: ':id', component: ProjectDetailComponent},
    {path: ':id/edit', component: ProjectEditComponent}
  ]},
  {path: 'processes', component: ProcessesComponent, children: [
    {path: 'new', component: ProcessEditComponent},
    {path: ':id', component: ProcessDetailComponent},
    {path: ':id/edit', component: ProcessEditComponent}
  ]},
  {path: 'tasks', component: TasksComponent, children: [
    {path: 'new', component: TaskEditComponent},
    {path: ':id', component: TaskDetailComponent},
    {path: ':id/edit', component: ProcessEditComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
