import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserDto } from 'src/app/shared/dto/user.dto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPageComponent implements OnInit {
  submittingObject = {isLoading: false, isSuccess: false};
  user: UserDto;

  get isLoading() {
    return this.submittingObject.isLoading;
  }

  get isSuccess() {
    return this.submittingObject.isSuccess;
  }

  get hasCandidate() {
    return !!this.user.candidate;
  }

  get hasCompany() {
    return !!this.user.company;
  }

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('userId');
    if (!!id){
      this.submittingObject.isLoading = true;
      this.authService.getUserById(id).pipe(take(1)).subscribe( user => {
        this.user = user;
        this.submittingObject.isLoading = false;
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
