import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
})
export class UserNavComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  menuOptionsState: { [key: string]: boolean } = {
    offer: false,
    transfer: false,
    pay: false,
    card: false,
    invest: false,
  };

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  menuLogic(menuOption: string) {
    switch (menuOption) {
      case 'offer': {
        this.resetMenuOptionsState();
        this.menuOptionsState['offer'] = true;
        // console.log(this.menuOptionsState);
        break;
      }
      case 'transfer': {
        this.resetMenuOptionsState();
        this.menuOptionsState['transfer'] = true;
        // console.log(this.menuOptionsState);
        break;
      }
      case 'card': {
        this.resetMenuOptionsState();
        this.menuOptionsState['card'] = true;
        // console.log(this.menuOptionsState);
        break;
      }
      case 'pay': {
        this.resetMenuOptionsState();
        this.menuOptionsState['pay'] = true;
        // console.log(this.menuOptionsState);
        break;
      }
      case 'invest': {
        this.resetMenuOptionsState();
        this.menuOptionsState['invest'] = true;
        // console.log(this.menuOptionsState);
        break;
      }
    }
  }

  selectedMenuOption(selectedOption: string) {
    if (this.menuOptionsState[selectedOption]) {
      return 'active';
    }
    return '';
  }

  resetMenuOptionsState() {
    Object.keys(this.menuOptionsState).forEach((key) => {
      this.menuOptionsState[key] = false;
    });
  }
}
