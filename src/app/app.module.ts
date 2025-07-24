import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProcessesComponent } from './processes/processes.component';
import { ProjectsComponent } from './projects/projects.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { ProcessDetailComponent } from './processes/process-detail/process-detail.component';
import { ProcessEditComponent } from './processes/process-edit/process-edit.component';
import { ProcessListComponent } from './processes/process-list/process-list.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { ProcessItemComponent } from './processes/process-item/process-item.component';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TasksFilterPipe } from './tasks/tasks-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    ProcessesComponent,
    ProjectsComponent,
    TaskListComponent,
    TaskEditComponent,
    ProcessDetailComponent,
    ProcessEditComponent,
    ProcessListComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    TaskItemComponent,
    ProcessItemComponent,
    ProjectItemComponent,
    TaskDetailComponent,
    TasksFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
