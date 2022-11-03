import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngbd-loginPopover',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
    .loginPopover {
        background: blue;
    }
    .loginPopover .arrow::after {
       background: blue;
    }
    `
  ]
})
export class LoginPopover {}
