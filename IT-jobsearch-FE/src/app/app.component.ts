import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { JobsService } from './features/jobs/services/jobs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _jobsService: JobsService) {}

  ngOnInit() {
    this._jobsService.checkExpired().pipe(take(1)).subscribe();
  }
}
