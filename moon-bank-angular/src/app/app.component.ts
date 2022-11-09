import { AfterContentInit, Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentInit {
  title = 'moon-bank';

  constructor(private authService: AuthService) {}


  ngAfterContentInit(): void {
    this.navBarLogic()
  }

  navBarLogic() {
    if (this.authService.isLoggedIn()) {
      if (this.authService.getRoles()!.includes('ROLE_ADMIN')) {
        return 'admin';
      }
      return 'user';
    }
    return 'landing';
  }
}
