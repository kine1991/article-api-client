import { Component, OnInit, Input } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'site-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filterType;
  public listOfFilterItems;
  public selectedItem;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.selectedItem = params.get('categoryName').toLowerCase();
    });

    this.siteService.getFilter().subscribe(filter => {
      this.listOfFilterItems = filter.data[this.filterType];
    });
  }

}
