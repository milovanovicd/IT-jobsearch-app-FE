import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { JobsService } from 'src/app/features/jobs/services/jobs.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components';
import { CompanyJobDto } from 'src/app/shared/dto/companyJob.dto';
import { SeniorityTypeReverseLabel, StatusType } from 'src/app/shared/enums/enums';
import { CompaniesService } from '../../companies.service';
import { CompanyJobDialogComponent } from '../company-job-dialog/company-job-dialog.component';
import * as moment from 'moment';
import { JobApplicationsService } from 'src/app/features/jobs/services/job-applications.service';

@Component({
  selector: 'app-company-profile-jobs',
  templateUrl: './company-profile-jobs.component.html',
  styleUrls: ['./company-profile-jobs.component.scss']
})
export class CompanyProfileJobsComponent implements OnInit {
  jobs$: Observable<CompanyJobDto>;
  isLoading = false;
  companyId: any;
  displayedColumns: string[] = ['name', 'publishedDate', 'deadlineDate', 'position', 'seniority', 'status', 'actions'];

  constructor(
    public dialog: MatDialog,
    private _credidentialsService: CredentialsService,
    private _companiesService: CompaniesService,
    private _jobsService: JobsService,
    private _jobApplicationsService: JobApplicationsService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.companyId = this._credidentialsService.getCompany().id;
    this.jobs$ = this.fetchCompanyJobs();
  }

  fetchCompanyJobs(): Observable<any> {
    return this._companiesService.get(this.companyId).pipe(map(company => company.jobs.filter(job => job.status === "Active")),take(1));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CompanyJobDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef
    .afterClosed()
    .pipe(take(1))
    .subscribe(result => {
      if (result) {
        this.isLoading = true;
        this._jobsService.create(result).pipe(take(1)).subscribe((createdJob) => {
          this.jobs$ = this.fetchCompanyJobs();
          this.isLoading = false;
        },(error) => {
          this.openSnackBar(error.message);
          this.isLoading = false;
        });
      }
    });
  }

  openUpdateDialog(job?: any) {
    const dialogRef = this.dialog.open(CompanyJobDialogComponent, {
      data : job,
      width: '600px',
      disableClose: true
    });

    dialogRef
    .afterClosed()
    .pipe(take(1))
    .subscribe(result => {
      if (result) {
        this.isLoading = true;
        this._jobsService.update(job.id, result).pipe(take(1)).subscribe((updatedJob) => {
          this.jobs$ = this.fetchCompanyJobs();
          this.isLoading = false;
        },(error) => {
          this.openSnackBar(error.message);
          this.isLoading = false;
        });
      }
    });
  }

  onDeactivate(job) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'All job applications for this job will be removed! Are you sure you want to deactivate this job? ',
      width: '400px',
      disableClose: true
    });

    dialogRef
    .afterClosed()
    .pipe(take(1))
    .subscribe(result => {
      if (result) {
        this.isLoading = true

        const updatedJob = {
          ...job,
          companyId: this.companyId,
          seniority: SeniorityTypeReverseLabel.get(job.seniority),
          status: StatusType.Inactive,
          publishedDate: moment(new Date(job.publishedDate)).format('DD.MM.YYYY'),
          deadlineDate: moment(new Date(job.deadlineDate)).format('DD.MM.YYYY'),
        };

        this._jobsService.update(job.id, updatedJob).pipe(switchMap(() => {
          this.jobs$ = this.fetchCompanyJobs();
          return this._jobApplicationsService.removeByJob(job.id);
        }),take(1)).subscribe(() => {
          this.isLoading = false;
        },(error) => {
          this.openSnackBar(error.message);
          this.isLoading = false;
        });
      }
    });
  }

  openSnackBar(message: string, action ="Close") {
    this._snackBar.open(message, action);
  }

}
