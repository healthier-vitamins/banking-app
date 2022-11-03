import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
		`
			.loginPopover {
        margin-right: 10px !important;
        max-width: fit-content !important;
			}
			.loginPopover .arrow::after {
				
			}
		`,
	],
})

export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
