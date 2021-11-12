import {Component} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as model from '../../models/model-interfaces';
import {Task} from '../../models/model-interfaces';
import {TaskService} from '../../services/task-service/task.service';


@Component({
  selector: 'task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css'],
})
export class TaskOverviewComponent {

  model = model;

  task!: Task ;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskService.getTask(params['id']).subscribe((task: Task) => {
        this.task = task;
      });
    });
  }
}
