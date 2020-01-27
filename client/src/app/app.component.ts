import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  layout = 'frontend';
  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter((event => event instanceof NavigationEnd)),
      )
      .subscribe((a: NavigationEnd) => {
        this.layout = (a.url.match(/\/(backend)(.+)?/gm)) ? 'backend' : 'frontend';
      });
  }
}
