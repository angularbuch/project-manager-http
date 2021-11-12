import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login.guard';
import {NotFoundComponent} from './not-found/not-found.component';
import {TaskOverviewComponent} from './tasks/task-overview/task-overview.component';
import {tasksRoutes, tasksRoutingComponents, tasksRoutingProviders} from './tasks/tasks.routing';
import {JsonpExampleComponent} from './jsonp-example/jsonp-example.component';

export const appRoutes: Routes = [
  {path: '', component: DashboardComponent}, //Dashboard direkt unter dem Root-Pfad

  {path: 'dashboard', component: DashboardComponent, data: {title: 'Startseite'}}, //Dashboard unter /dashboard
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, //ohne terminal würde jede unbekannte route zu dashboard-mappen
  {path: 'settings', component: SettingsComponent, data: {title: 'Einstellungen'}},
  {path: 'about', component: AboutComponent, data: {title: 'Über uns'}},
  {path: 'flickr', component: JsonpExampleComponent, data: {title: 'Flickr-Suche'}},

  {path: 'login', component: LoginComponent},

  {
    path: 'tasks', canActivate: [LoginGuard],
    children: tasksRoutes
  },

  {path: 'overview/:id', component: TaskOverviewComponent, outlet: 'right'},

  /** Redirect Konfigurationen **/
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}, // immer als letztes konfigurieren - erste Route die matched wird angesteuert
];

export const appRouting = RouterModule.forRoot(appRoutes);

export const routingComponents = [DashboardComponent, SettingsComponent, AboutComponent, LoginComponent, NotFoundComponent,
  JsonpExampleComponent, ...tasksRoutingComponents];

export const routingProviders = [LoginGuard,
  ...tasksRoutingProviders];
