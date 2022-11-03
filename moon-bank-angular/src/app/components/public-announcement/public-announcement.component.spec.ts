import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAnnouncementComponent } from './public-announcement.component';

describe('PublicAnnouncementComponent', () => {
  let component: PublicAnnouncementComponent;
  let fixture: ComponentFixture<PublicAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
