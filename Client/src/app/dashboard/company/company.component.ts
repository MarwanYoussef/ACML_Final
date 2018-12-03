import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  constructor(
      private themeService: NbThemeService,
      private router: Router
  )
  {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }
  ngOnInit() { }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  goToHome() {
     this.router.navigate(['/dashboard/items']);
  }
}
