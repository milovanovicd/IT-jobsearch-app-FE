import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileApplicationsComponent } from './company-profile-applications.component';

describe('CompanyProfileApplicationsComponent', () => {
  let component: CompanyProfileApplicationsComponent;
  let fixture: ComponentFixture<CompanyProfileApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfileApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
