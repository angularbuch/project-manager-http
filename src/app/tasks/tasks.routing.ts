import {Routes} from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {EditTaskGuard} from './edit-task/edit-task.guard';
import {TaskOverviewComponent} from './task-overview/task-overview.component';
import {TaskItemComponent} from './task-list/task-item.component';
import {TasksComponent} from './tasks.component';

export const tasksRoutes: Routes = [
  {path: '', component: TaskListComponent},
  {
    path: 'edit/:id', component: EditTaskComponent,
    data: {title: 'Aufgabe bearbeiten'},
    canDeactivate: [EditTaskGuard]
  },
  {
    path: 'new', component: EditTaskComponent,
    data: {title: 'Neue Aufgabe anlegen'},
    canDeactivate: [EditTaskGuard]
  },
  {path: 'overview', component: TaskOverviewComponent, outlet: 'right'},
];

export const tasksRoutingComponents = [TasksComponent, TaskListComponent, TaskItemComponent, EditTaskComponent, TaskOverviewComponent];
export const tasksRoutingProviders = [EditTaskGuard];
