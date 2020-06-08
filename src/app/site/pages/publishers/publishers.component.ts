import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  public publishers;
  public count;

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.siteService.getPublishers().subscribe(publisher => {
      this.publishers = publisher.data.users
      this.count = publisher.results
    })
  }

}
