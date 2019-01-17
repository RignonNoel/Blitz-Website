import { Component, OnInit } from '@angular/core';
import {CouponService} from '../../../../services/coupon.service';
import {Coupon} from '../../../../models/coupon';
import {AuthenticationService} from '../../../../services/authentication.service';

@Component({
  selector: 'app-profile-coupons',
  templateUrl: './profile-coupons.component.html',
  styleUrls: ['./profile-coupons.component.scss']
})
export class ProfileCouponsComponent implements OnInit {

  listCoupons: Coupon[];

  constructor(private couponService: CouponService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.refreshCoupons();
    }
  }

  refreshCoupons() {
    const filters = [
      {
        'name': 'owner',
        'value': this.authenticationService.getProfile().id
      }
    ];
    this.couponService.list().subscribe(
      coupons => {
        this.listCoupons = coupons.results.map(
          r => new Coupon(r)
        );
      },
      err => {
        console.error('Can\'t list coupons from API');
      }
    );
  }
}
