import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router,} from '@angular/router';
import {LoginService} from './services/login-service/login-service';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'pjm-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  defaultTitle!: string;

  constructor(@Optional() @Inject('AUTH_ENABLED') public authEnabled: boolean,
              public loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private titleService: Title) {
  }


  ngOnInit() {
    this.defaultTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setBrowserTitle();
      });
  }

  setBrowserTitle() {
    let state = this.activatedRoute;
    let title = this.defaultTitle;
    let route = this.activatedRoute;
    // firstChild gibt die Haupt-Kindroute der übergebenen Route zurück
    while (state.firstChild) {
      state = state.firstChild;
      title = route.snapshot.data['title'] || title;
    }
    this.titleService.setTitle(title);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    return false;
  }


}

