import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Menu {
  name?: string;
  icon?: string;
  url?: string;
  hide?: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  menus: Menu[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService
  ) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.menus = [
      {
        name: 'Dashboard',
        url: '/backend/dashboard',
        hide: false,
      },
      {
        name: 'Fitur',
        url: '/backend/fitur',
        hide: false,
      },
      {
        name: 'Project',
        url: '/backend/project',
        hide: false,
      },
      {
        name: 'Vote',
        url: '/backend/vote',
        hide: false,
      },
      {
        name: 'Laporan',
        url: '/backend/report',
        hide: false,
      },
      {
        name: 'Pengguna',
        url: '/backend/user',
        hide: false,
      },
      {
        name: 'Organisasi',
        url: '/backend/organization',
        hide: false,
      },
      {
        name: 'Role',
        url: '/backend/role',
        hide: false,
      },
    ];
  }

  logout() {
    setTimeout(() => {
      this.auth.logout();
    }, 500);
  }

}
