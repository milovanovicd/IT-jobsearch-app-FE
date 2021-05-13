import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
  @Input() externalCompanies = null;
  @Input() isExternal = false;

  isLoading = false;
  companies$: Observable<any[]>

  constructor(private _companiesService: CompaniesService, private _router: Router) {
    // override the route reuse strategy
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.companies$ = this._companiesService.getAll().pipe(take(1))
   }

  details(id){
    this._router.navigate(['companies/'+id]);
  }
}
