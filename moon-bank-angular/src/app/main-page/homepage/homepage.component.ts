import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      if(this.authService.getRoles()!.includes("ROLE_ADMIN")) {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/user'])
      }
    }
  }

}
