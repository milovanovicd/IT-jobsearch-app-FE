import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { take, debounceTime } from 'rxjs/operators';
import {
  mapMetadataValues,
  arrayToOptions,
} from 'src/app/shared/helpers/helper-methods';
import { MetadataService } from 'src/app/shared/services/metadata.service';
import * as queryString from 'query-string';
import { CompaniesService } from '../../companies.service';
import { locationsArray, noOfEmployeesArray } from 'src/app/shared/mocks/select-arrays';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.page.html',
  styleUrls: ['./company-search.page.scss'],
})
export class CompanySearchPageComponent implements OnInit {
  value = '';
  isLoading = false;
  industries = [];
  locations = [];
  noOfEmployees = [];
  form: FormGroup;
  companies: any[];
  inititalCompanies: any[];
  inputSubscription: Subscription;
  inputObservable$: Observable<any>;

  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private _metadataService: MetadataService,
    private _fb: FormBuilder,
    private _companiesService: CompaniesService
  ) {}

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

  ngOnInit() {
    this.fillOptions();
    this.createForm();
    this._companiesService
      .getAll()
      .pipe(take(1))
      .subscribe((companies) => {
        this.companies = companies;
        this.inititalCompanies = companies;
      });

    this.inputObservable$ = this.form.controls['name'].valueChanges;
    this.inputSubscription = this.inputObservable$
      .pipe(debounceTime(300))
      .subscribe(({ target }) => {
        this.filter();
      });
  }

  fillOptions() {
    this.isLoading = true;
    this.locations = arrayToOptions(locationsArray);
    this.noOfEmployees = arrayToOptions(noOfEmployeesArray);
    this._metadataService
      .getAll()
      .pipe(take(1))
      .subscribe(({ industries }) => {
        this.industries = mapMetadataValues(industries);
        this.isLoading = false;
      });
  }

  createForm() {
    this.form = this._fb.group({
      name: [],
      industries: [],
      locations: [],
      noOfEmployees: [],
    });
  }

  filter() {
    const qs =
      queryString.stringify(this.form.value, {
        skipEmptyString: true,
        skipNull: true,
        arrayFormat: 'comma',
      });
    console.log(qs);
    this.isLoading = true;
    this._companiesService
      .getAll(qs)
      .pipe(take(1))
      .subscribe((companies) => {
        this.companies = companies;
        this.isLoading = false;
      });
  }
}
