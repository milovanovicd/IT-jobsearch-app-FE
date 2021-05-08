import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CandidatesService } from 'src/app/features/candidates/candidates.service';
import { JobApplicationsService } from '../../services/job-applications.service';

@Component({
  selector: 'app-job-aplication-dialog',
  templateUrl: './job-aplication-dialog.component.html',
  styleUrls: ['./job-aplication-dialog.component.scss'],
})
export class JobAplicationDialogComponent implements OnInit {
  isLoading = false;
  isSuccessful = false;
  resume: string = null;
  isResumeConfirmed = false;

  constructor(
    public dialogRef: MatDialogRef<JobAplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job: any; candidate: any },
    private candidateService: CandidatesService,
    private jobApplicationsService: JobApplicationsService
  ) {}

  ngOnInit(): void {
    const { id } = this.data.candidate;
    this.candidateService
      .get(id)
      .pipe(take(1))
      .subscribe(({ resume }) => {
        this.resume = resume;
      });
  }

  onApply() {
    this.isLoading = true;
    this.jobApplicationsService
      .create({ jobId: this.data.job.id, candidateId: this.data.candidate.id })
      .pipe(take(1))
      .subscribe(() => {
        this.isSuccessful = true;
        this.isLoading = false;
      });
  }

  onLoadingChange(value) {
    this.isLoading = value;
  }

  onResumeValueChanged(value) {
    this.resume = value;
  }
}
