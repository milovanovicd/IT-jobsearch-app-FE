import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobItemComponent implements OnInit {
  @Input() job;
  daysAgo: number;

  constructor() {}

  getDifferenceInDays(publishedDate): number {
    if(!publishedDate) return 0;
    const diffTime = Math.abs(new Date().getTime() - publishedDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  ngOnInit(): void {
    this.daysAgo = this.getDifferenceInDays(this.job.publishedDate? new Date(this.job.publishedDate) : null);
  }
}
