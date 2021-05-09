import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { JobApplicationDetailsDialogComponent } from 'src/app/features/jobs/components';
import { JobApplicationsService } from 'src/app/features/jobs/services/job-applications.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components';
import { JobApplicationDto } from 'src/app/shared/dto/jobApplication.dto';
import { CandidatesService } from '../../candidates.service';

@Component({
  selector: 'app-candidate-profile-jobs',
  templateUrl: './candidate-profile-jobs.component.html',
  styleUrls: ['./candidate-profile-jobs.component.scss'],
})
export class CandidateProfileJobsComponent implements OnInit {
  jobAplications$: Observable<JobApplicationDto>;
  isLoading = false;
  candidateId: any;
  displayedColumns: string[] = [
    'name',
    'appliedDate',
    'company',
    'position',
    'actions',
  ];

  constructor(
    public dialog: MatDialog,
    private _credidentialsService: CredentialsService,
    private _candidatesService: CandidatesService,
    private _jobApplicationsService: JobApplicationsService
  ) {}

  ngOnInit(): void {
    this.candidateId = this._credidentialsService.getCandidate().id;
    this.jobAplications$ = this.fetchApplications();
  }

  fetchApplications(): Observable<JobApplicationDto> {
    return this._candidatesService.get(this.candidateId).pipe(
      take(1),
      map((candidate) => candidate.jobApplications)
    );
  }

  onDelete(jobApplication: JobApplicationDto) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this job application?',
      width: '400px',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            this.isLoading = true;
            return this._jobApplicationsService.remove(
              jobApplication.job.id,
              this.candidateId
            );
          }
        }),
        switchMap(() => {
            this.jobAplications$ = this.fetchApplications();
            const { id } = this._credidentialsService.getCandidate();
            this.isLoading = false;
            return this._candidatesService.updateAppliedJobs(id);
        }),
        take(1)
      )
      .subscribe();
  }

  details(jobApplication: JobApplicationDto) {
    this.dialog.open(JobApplicationDetailsDialogComponent, {
      data: jobApplication,
      width: '500px',
      disableClose: true,
    });
  }
}
