import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-profile-delete-account',
  templateUrl: './company-profile-delete-account.component.html',
  styleUrls: ['./company-profile-delete-account.component.scss'],
})
export class CompanyProfileDeleteAccountComponent implements OnInit {
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _companiesService: CompaniesService,
    private _credentialsService: CredentialsService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onDeleteAccount() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'All of your data will be deleted. Are you sure you want to delete your account?',
      width: '400px',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => result),
        switchMap(() => {
          this.isLoading = true;
          return this._companiesService.remove(
            this._credentialsService.getCompany().id
          );
        }),tap(() => {
          this._authService.logout();
          this._router.navigate(['/login']);
        })
      )
      .subscribe(
        () => {},
        (error) => {
          this.openSnackBar(error.message);
          this.isLoading = false;
        }
      );
  }

  openSnackBar(message: string, action = 'Close') {
    this._snackBar.open(message, action);
  }
}
