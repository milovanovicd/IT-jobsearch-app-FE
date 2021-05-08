import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  @Input() companyJobs = null;

  isLoading = false;
  jobs$: Observable<any[]>

  constructor(private _jobsService:JobsService, private _router: Router) { }

  ngOnInit() {
    this.jobs$ = this._jobsService.getAll();
  }

  details(id){
    this._router.navigate(['jobs/'+id]);
  }

  get isCompany() {
    return this.companyJobs !== null;
  }
}
