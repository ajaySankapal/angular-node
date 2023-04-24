import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any = []
  constructor() { }

  ngOnInit() {
  }

  getTags(tags: any) {
    return tags.split(',')
  }

  getAttributes(att: any) {
    console.log(att)
    console.log(JSON.parse(att), 'json')
    return JSON.parse(att)
  }

  getObjectProperties(obj: any): string {
    let output = '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        output += `${key}: ${obj[key]}`;
      }
    }
    return output;
  }

}
