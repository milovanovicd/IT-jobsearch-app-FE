import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  isLoading = false;
  jobs$: Observable<any[]>

  constructor(private _jobsService:JobsService, private _router: Router) { }

  ngOnInit() {
    this.jobs$ = this._jobsService.getAll().pipe(take(1))
   }

  details(id){
    this._router.navigate(['jobs/'+id]);
  }
}
