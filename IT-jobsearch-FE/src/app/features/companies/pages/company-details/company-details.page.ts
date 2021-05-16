import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompaniesService } from '../../companies.service';
import { CompanyDto } from 'src/app/shared/dto/company.dto';
import { CompanyJobDto } from 'src/app/shared/dto/companyJob.dto';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPageComponent implements OnInit {
  isLoading = false;
  company$: Observable<CompanyDto> = null;
  activeJobs: CompanyJobDto[] = [];

  get similarJobs() {
    return this.getActiveJobs(this.activeJobs).slice(0,4);
  }

  get activeJobsNo(){
    return this.activeJobs.length;
  }

  getActiveJobs(jobs) {
    return jobs.filter(job => job.status === "Active");
  }

  constructor(
    private _companiesService: CompaniesService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.company$ = this._companiesService
      .get(id)
      .pipe(tap((company) => {
        console.log(company);
        this.activeJobs = this.getActiveJobs(company.jobs);
        this.isLoading = false;
      }));
  }
}
