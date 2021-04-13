import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from 'src/app/core/auth/credentials.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPageComponent implements OnInit {
  isLoading = false;
  job$: Observable<any> = null;

  constructor(
    private _jobsService: JobsService,
    private _activatedRoute: ActivatedRoute,
    private _credidentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.job$ = this._jobsService
      .get(id)
      .pipe(tap((_) => (this.isLoading = false)));
  }

  isCandidate() {
    return this._credidentialsService.isCandidate;
  }

  onApplyJob(jobId: any) {
    console.log('Apply for Job: ' + jobId);
  }
}
