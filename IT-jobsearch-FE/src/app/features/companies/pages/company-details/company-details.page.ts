import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompaniesService } from '../../companies.service';
import { CompanyDto } from 'src/app/shared/dto/company.dto';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPageComponent implements OnInit {
  isLoading = false;
  company$: Observable<CompanyDto> = null;

  constructor(
    private _companiesService: CompaniesService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.isLoading = true;
      this.company$ = this._companiesService.get(params['id']).pipe(
        tap((_) => (this.isLoading = false))
      );
    });
  }
}
