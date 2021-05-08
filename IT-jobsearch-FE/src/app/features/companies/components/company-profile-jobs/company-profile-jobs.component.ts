import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { JobsService } from 'src/app/features/jobs/services/jobs.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components';
import { CompanyJobDto } from 'src/app/shared/dto/companyJob.dto';
import { CompaniesService } from '../../companies.service';
import { CompanyJobDialogComponent } from '../company-job-dialog/company-job-dialog.component';

@Component({
  selector: 'app-company-profile-jobs',
  templateUrl: './company-profile-jobs.component.html',
  styleUrls: ['./company-profile-jobs.component.scss']
})
export class CompanyProfileJobsComponent implements OnInit {
  jobs$: Observable<CompanyJobDto>;
  isLoading = false;
  companyId: any;
  displayedColumns: string[] = ['name', 'publishedDate', 'deadlineDate', 'position', 'seniority', 'actions'];

  constructor(
    public dialog: MatDialog,
    private _credidentialsService: CredentialsService,
    private _companiesService: CompaniesService,
    private _jobsService: JobsService) { }

  ngOnInit(): void {
    this.companyId = this._credidentialsService.getCompany().id;
    this.jobs$ = this.fetchCompanyJobs();
  }

  fetchCompanyJobs(): Observable<any> {
    return this._companiesService.get(this.companyId).pipe(take(1), map(company => company.jobs));
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
        });
      }
    });
  }

  onDelete(job) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this job?',
      width: '400px',
      disableClose: true
    });

    dialogRef
    .afterClosed()
    .pipe(take(1))
    .subscribe(result => {
      if (result) {
        this.isLoading = true;
        this._jobsService.remove(job.id).pipe(take(1)).subscribe(_ => {
          this.jobs$ = this.fetchCompanyJobs();
          this.isLoading = false;
        });
      }
    });
  }

}
