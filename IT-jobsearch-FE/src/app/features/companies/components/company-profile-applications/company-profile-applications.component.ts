import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { JobsService } from 'src/app/features/jobs/services/jobs.service';

@Component({
  selector: 'app-company-profile-applications',
  templateUrl: './company-profile-applications.component.html',
  styleUrls: ['./company-profile-applications.component.scss'],
})
export class CompanyProfileApplicationsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  jobs$: Observable<any[]>
  displayedColumns: string[] = ['name', 'appliedDate', 'age', 'actions'];

  constructor(private _jobsService: JobsService) { }

  ngOnInit() {
    this.jobs$ = this._jobsService.getAll();
  }
}
