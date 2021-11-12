import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import * as model from '../../models/model-interfaces';
import {createInitialTask, Task} from '../../models/model-interfaces';
import {TaskService} from '../../services/task-service/task.service';
import {Subscription} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/internal/operators';


@Component({
  selector: 'ch-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  model = model;

  task: Task = createInitialTask();

  saved = false;

  @ViewChild(NgForm) form!: NgForm;

  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router,
              private titleService: Title,
              private location: Location) {
  }

  ngOnInit() {
    /*
    this.subscription = this.route.params
      .subscribe(params => {
        const id = (params['id']);
        if (id) {
          this.taskService.getTask(id).subscribe((task) => {
            this.task = task || createInitialTask();
          })
        }
      });
    */

    this.subscription = this.route.params.pipe(
      map(params => params['id']),
      filter(id => id !== undefined),
      mergeMap(id => this.taskService.getTask(id)))
      .subscribe((task: Task) => {
        this.task = task;
        this.task.assignee = this.task.assignee || {};
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTag() {
    this.task.tags?.push({label: ''});
    return false;
  }

  removeTag(i: number) {
    this.task.tags?.splice(i, 1);
    return false;
  }

  saveTask() {
    this.taskService.saveTask(this.task).subscribe(task => {
      this.saved = true;
      const relativeUrl = this.router.url.includes('edit') ? '../..' : '..';
      this.router.navigate([relativeUrl], {relativeTo: this.route});
    });
  }

  cancel() {
    this.location.back();
    return false;
  }

  canDeactivate(): boolean {
    if (this.saved || !this.form.dirty) {
      return true;
    }
    return window.confirm(`Ihr Formular besitzt ungespeicherte Änderungen, möchten Sie die Seite wirklich verlassen?`);
  }

}
