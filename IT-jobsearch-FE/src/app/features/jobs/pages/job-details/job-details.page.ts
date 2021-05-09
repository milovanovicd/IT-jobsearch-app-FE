import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { JobAplicationDialogComponent } from '../../components/job-aplication-dialog/job-aplication-dialog.component';
import { CandidatesService } from 'src/app/features/candidates/candidates.service';

const jobApplicationsKey = 'jobApplications';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPageComponent implements OnInit {
  isLoading = false;
  isApplied = false;
  job$: Observable<any> = null;

  constructor(
    public dialog: MatDialog,
    private _jobsService: JobsService,
    private _activatedRoute: ActivatedRoute,
    private _credidentialsService: CredentialsService,
    private _candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.job$ = this._jobsService
      .get(id)
      .pipe(tap((_) => (this.isLoading = false)));

    // Check if candidate has already applied for this job
    if(this._credidentialsService.isCandidate){
      const appliedJobs: any[] = JSON.parse(localStorage.getItem(jobApplicationsKey));
      if(appliedJobs.includes(+id)) { this.isApplied = true; }
    }
  }

  isCandidate() {
    return this._credidentialsService.isCandidate;
  }

  onApplyJob(job: any) {
    const dialogRef = this.dialog.open(JobAplicationDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        job,
        candidate: this._credidentialsService.getCandidate()
      }
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.isApplied = true;
        const { id } = this._credidentialsService.getCandidate();
        this._candidatesService.updateAppliedJobs(id).pipe(take(1)).subscribe();
      }
    })
  }
}
