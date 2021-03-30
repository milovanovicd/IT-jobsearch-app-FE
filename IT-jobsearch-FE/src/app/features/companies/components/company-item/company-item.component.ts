import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyItemComponent implements OnInit {
  @Input() company;

  constructor() {}

  ngOnInit(): void {}
}
