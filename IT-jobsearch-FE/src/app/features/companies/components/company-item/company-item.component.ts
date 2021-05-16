import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CompanyDto } from 'src/app/shared/dto/company.dto';
import { StatusTypeReverseLabel } from 'src/app/shared/enums/enums';
import { Company } from 'src/app/shared/models/company.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyItemComponent implements OnInit {
  @Input() company: CompanyDto;

  get activeJobsNo(){
    return this.company.jobs.filter(job => job.status === "Active").length;
  }

  constructor() {}

  ngOnInit(): void {}
}
