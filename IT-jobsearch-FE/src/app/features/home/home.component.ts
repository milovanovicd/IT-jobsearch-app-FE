import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CandidatesService } from '../candidates/candidates.service';
import { CompaniesService } from '../companies/companies.service';
import { JobsService } from '../jobs/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs: any[];
  companies: any[];

  constructor(
    private _credentialsService: CredentialsService,
    private _candidatesService: CandidatesService,
    private _jobsService: JobsService,
    private _companiesService: CompaniesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Remeber candidate applied jobs IDs in local storage
    if (this._credentialsService.isCandidate) {
      const { id } = this._credentialsService.getCandidate();
      this._candidatesService.updateAppliedJobs(id).pipe(take(1)).subscribe();
    }

    this._jobsService
      .getAll()
      .pipe(
        take(1),
        map((jobs) => jobs.slice(0, 5))
      )
      .subscribe((jobs) => {
        this.jobs = jobs;
      });

    this._companiesService
      .getAll()
      .pipe(
        take(1),
        map((companies) => companies.slice(0, 5))
      )
      .subscribe((companies) => {
        this.companies = companies;
      });
  }

  onSeeMoreJobs() {
    this._router.navigate(['/jobs']);
  }

  onSeeMoreCompanies() {
    this._router.navigate(['/companies']);
  }
}
