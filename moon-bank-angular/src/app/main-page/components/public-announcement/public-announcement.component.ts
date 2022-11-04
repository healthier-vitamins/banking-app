import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-announcement',
  templateUrl: './public-announcement.component.html',
  styleUrls: ['./public-announcement.component.css']
})
export class PublicAnnouncementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  publicAnnounceShowMore() { 
    console.log("show more")
  }

}
