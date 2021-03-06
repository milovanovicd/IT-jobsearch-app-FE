import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CreateCompanyDto } from 'src/app/shared/dto/createCompany.dto';
import { UserDto } from 'src/app/shared/dto/user.dto';
import { arrayToOptions } from 'src/app/shared/helpers/helper-methods';
import { locationsArray } from 'src/app/shared/mocks/select-arrays';
import { MetadataService } from 'src/app/shared/services/metadata.service';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.scss'],
})
export class RegistrationCompanyComponent implements OnInit {
  @Input() user: UserDto;
  @Input() submittingObject: {isLoading: boolean, isSuccess: boolean};

  isLoading = false;
  form: FormGroup;
  industries: any[];
  locations: any[];

  constructor(
    private _fb: FormBuilder,
    private _metadataService: MetadataService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initMetadata();
    this.initForm();
  }

  initMetadata() {
    this.isLoading = true;
    this.locations = arrayToOptions(locationsArray);
    this._metadataService
      .getAll()
      .pipe(take(1))
      .subscribe(
        ({ industries }) => {
          this.industries = industries.map(({description}) => ({value: description, label: description}));
          console.log(this.industries);
          this.isLoading = false;
        });
  }

  initForm() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: [{ value: this.user.username, disabled: true }],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      location: ['', Validators.required],
      industry: ['', Validators.required],
      noOfEmployees: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    console.log(this.user);
    console.log(this.form.getRawValue());
    const company = this.prepareFieldsForCreate(this.form.value);
    this.submittingObject.isLoading = true;
    this._authService.registerCompany(this.user.company.id, company).pipe(take(1)).subscribe((response) => {
      this.submittingObject.isLoading = false;
      this.submittingObject.isSuccess = true;
      this.openSnackBar("Registration successfull!");
    }, ({error}) => {
      this.openSnackBar(error.message);
      this.submittingObject.isLoading = false;
      this.submittingObject.isSuccess = false;
    } );

  }

  prepareFieldsForCreate(form: any): CreateCompanyDto {
    return {
      id: this.user.company.id,
      name: form.name,
      description: form.description,
      industry: form.industry,
      location: form.location,
      noOfEmployees: form.noOfEmployees.toString()
    };
  }

  addIndustryTag(tag: string){
    return {value: tag, label: tag};
  }

  openSnackBar(message: string, action = 'Close') {
    this._snackBar.open(message, action);
  }
}
