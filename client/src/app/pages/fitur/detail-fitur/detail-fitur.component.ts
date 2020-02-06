import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-fitur',
  templateUrl: './detail-fitur.component.html',
  styleUrls: ['./detail-fitur.component.scss']
})
export class DetailFiturComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}

export class SliderFormattingExample {
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
