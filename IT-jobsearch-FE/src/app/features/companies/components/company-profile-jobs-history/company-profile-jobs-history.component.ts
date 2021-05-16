import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { JobsService } from 'src/app/features/jobs/services/jobs.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components';
import { CompanyJobDto } from 'src/app/shared/dto/companyJob.dto';
import { Job } from 'src/app/shared/models/job.model';
import { CompaniesService } from '../../companies.service';
import { CompanyJobDialogComponent } from '../company-job-dialog/company-job-dialog.component';

@Component({
  selector: 'app-company-profile-jobs-history.component',
  templateUrl: './company-profile-jobs-history.component.html',
  styleUrls: ['./company-profile-jobs-history.component.scss']
})
export class CompanyProfileJobsHistoryComponent implements OnInit {
  jobs$: Observable<Job[]>;
  isLoading = false;
  companyId: any;
  displayedColumns: string[] = ['name', 'publishedDate', 'deadlineDate', 'position', 'seniority', 'status', 'actions'];

  constructor(
    public dialog: MatDialog,
    private _credidentialsService: CredentialsService,
    private _companiesService: CompaniesService,
    private _jobsService: JobsService) { }

  ngOnInit(): void {
    this.companyId = this._credidentialsService.getCompany().id;
    this.jobs$ = this.fetchCompanyJobs();
  }

  fetchCompanyJobs(): Observable<Job[]> {
    return this._companiesService.get(this.companyId).pipe(map(company => company.jobs.filter(job => job.status !== "Active")), take(1));
  }

  openRenewDialog(job?: any) {
    if(!!job) {
        job.isRenew = true;
    }

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
        this._jobsService.update(job.id, result).pipe(take(1)).subscribe((renewedJob) => {
          this.jobs$ = this.fetchCompanyJobs();
          this.isLoading = false;
        });
      }
    });
  }

}
