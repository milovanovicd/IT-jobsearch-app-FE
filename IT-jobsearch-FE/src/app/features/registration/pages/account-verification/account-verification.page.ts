import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserDto } from 'src/app/shared/dto/user.dto';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.page.html',
  styleUrls: ['./account-verification.page.scss'],
})
export class AccountVerificationPageComponent implements OnInit {
  isLoading = false;
  isSuccessful = false;
  token: string;
  user: UserDto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.confirmAccount();
  }

  confirmAccount() {
    this.isLoading = true;
    this.authService
      .confirmAccount(this.token)
      .pipe(take(1))
      .subscribe((user: any) => {
        console.log('User =>', user);
        this.user = user;
        this.isSuccessful = true;
        this.isLoading = false;
      }, (error) => {
        this.isSuccessful = error.ok; // za svaki slucaj
        this.isLoading = false;
      });
  }

  onContinue() {
    this.router.navigateByUrl(`/registration?userId=${this.user.id}`);
  }

  onSignup() {
    this.router.navigate(['/login']);
  }
}
