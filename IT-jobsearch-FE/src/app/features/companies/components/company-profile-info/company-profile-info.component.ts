import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { industries } from 'src/app/shared/mocks/select-arrays';
import { Company } from 'src/app/shared/models/company.model';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-profile-info',
  templateUrl: './company-profile-info.component.html',
  styleUrls: ['./company-profile-info.component.scss'],
})
export class CompanyProfileInfoComponent implements OnInit {
  companyForm: FormGroup;
  company: Company;
  isEditable = false;
  isLoading = false;
  industriesArray = industries.map((value) => ({ value, label: value }));

  constructor(
    private _formBuilder: FormBuilder,
    private _companyService: CompaniesService,
    private _credidentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    const { id } = this._credidentialsService.getCompany();
    this._companyService
      .get(id)
      .pipe(
        take(1),
        // tslint:disable-next-line: no-shadowed-variable
        tap((data) => (this.company = data))
      )
      .subscribe(() => this.initForm());
  }

  createForm() {
    this.companyForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', Validators.required],
      noOfEmployees: ['', [Validators.required, Validators.min(0)]],
      industry: ['', Validators.required],
    });
  }

  initForm() {
    this.disableForm();
    this.companyForm.patchValue(this.company);
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    this.isEditable ? this.enableForm() : this.disableForm();
  }

  onUpdate() {
    this.isLoading = true;
    const toUpdate = { ...this.company, ...this.companyForm.value };
    this._companyService
      .update(this.company.id, toUpdate)
      .pipe(take(1))
      .subscribe((data) => {
        this.company = data;
        this.toggleEdit();
        this.initForm();
        this.isLoading = false;
      });
  }

  disableForm() {
    this.companyForm.disable();
  }

  enableForm() {
    this.companyForm.enable();
  }

  onCancel(){
    this.toggleEdit();
    this.initForm();
  }
}
