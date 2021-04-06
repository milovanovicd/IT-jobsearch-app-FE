import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPageComponent implements OnInit {
  isLoading = false;
  job$: Observable<any> = null;

  constructor(private _jobsService: JobsService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.isLoading = true;
      this.job$ = this._jobsService.get(params['id']).pipe(take(1), tap(_ => this.isLoading= false));
    });
  }

  onApplyJob(jobId: any){
    console.log("Apply for Job: " + jobId);
  }
}
