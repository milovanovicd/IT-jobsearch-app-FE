import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-application-details-dialog',
  templateUrl: './job-application-details-dialog.component.html',
  styleUrls: ['./job-application-details-dialog.component.scss']
})
export class JobApplicationDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JobApplicationDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job: any; candidate: any, createdOn: string }) { }

  ngOnInit(): void {
  }

}
