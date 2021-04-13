import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CompanyDto } from 'src/app/shared/dto/company.dto';
import { CompaniesService } from '../../companies.service';

const companyKey = 'company';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePageComponent implements OnInit {
  company$: Observable<CompanyDto> = null;

  constructor(
    private _companiesService: CompaniesService,
    private _credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    const savedCompany =
      sessionStorage.getItem(companyKey) || localStorage.getItem(companyKey);

    if (!savedCompany) {
      console.log(this._credentialsService.getCompany());
      const { id } = this._credentialsService.getCompany();
      this.company$ = this._companiesService.get(id).pipe(
        tap((company) => {
          this._credentialsService.setCompany(company);
        })
      );
    } else {
      this.company$ = of(JSON.parse(savedCompany));
    }
  }
}
