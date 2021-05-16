import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-profile-applications',
  templateUrl: './company-profile-applications.component.html',
  styleUrls: ['./company-profile-applications.component.scss'],
})
export class CompanyProfileApplicationsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  jobs$: Observable<any[]>
  displayedColumns: string[] = ['name', 'appliedDate', 'age', 'actions'];

  constructor(private _companyService: CompaniesService, private _credentialsService: CredentialsService) { }

  ngOnInit() {
    this.jobs$ = this._companyService.get(this._credentialsService.getCompany().id).pipe(map(company => company.jobs));
  }
}
