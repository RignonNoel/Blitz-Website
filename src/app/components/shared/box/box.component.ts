import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  @Input() actionLabel;

  constructor() { }

  ngOnInit() {
  }

  triggerAction() {
    console.log('click on action button of the box');
  }
}
