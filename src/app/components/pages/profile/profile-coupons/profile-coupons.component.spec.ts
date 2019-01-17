import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCouponsComponent } from './profile-coupons.component';

describe('ProfileCouponsComponent', () => {
  let component: ProfileCouponsComponent;
  let fixture: ComponentFixture<ProfileCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
