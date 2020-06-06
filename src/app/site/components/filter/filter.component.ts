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
  public partOfRoute;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      // console.log('filterType', this.filterType)
      if (this.filterType === 'categories') {
        this.partOfRoute = 'category';
        this.selectedItem = params.get('categoryName').toLowerCase();
      } else if (this.filterType === 'authors') {
        this.partOfRoute = 'author';
        this.selectedItem = params.get('authorName').toLowerCase();
      }
    });

    this.siteService.getFilter().subscribe(filter => {
      this.listOfFilterItems = filter.data[this.filterType];
    });
  }

}
