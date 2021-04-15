import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { SeniorityTypeLabel } from 'src/app/shared/enums/enums';
import { mapMetadataValues, mapToArray } from 'src/app/shared/helpers/helper-methods';
import { MetadataService } from 'src/app/shared/services/metadata.service';

@Component({
  selector: 'app-jobs-search',
  templateUrl: './jobs-search.page.html',
  styleUrls: ['./jobs-search.page.scss'],
})
export class JobsSearchPageComponent implements OnInit {
  value = '';
  isLoading = false;
  positions = [];
  seniorities = [];
  technologies = [];

  constructor(private _metadataService: MetadataService) {}

  ngOnInit() {
    this.fillOptions();
  }

  fillOptions(){
    this.isLoading = true;
    this.seniorities = mapToArray(SeniorityTypeLabel);
    this._metadataService.getAll().pipe(take(1)).subscribe(({positions, technologies}) => {
      this.positions = mapMetadataValues(positions);
      this.technologies = mapMetadataValues(technologies);
      this.isLoading = false;
    });
  }
}
