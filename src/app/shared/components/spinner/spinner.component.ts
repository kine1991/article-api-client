import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() size;

  constructor() { }

  ngOnInit(): void {
  }

}
