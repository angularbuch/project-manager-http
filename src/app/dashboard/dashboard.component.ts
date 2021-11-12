import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent {

  title: string | undefined;

  constructor(private titleService: Title) {
  }

  originalTitle!: string;

  ngOnInit() {
    this.originalTitle = this.titleService.getTitle();
    if (this.title) {
      this.titleService.setTitle(this.title);
    }
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.originalTitle);
  }

}
