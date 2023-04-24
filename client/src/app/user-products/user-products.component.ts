import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { SocketServiceService } from '../shared/services/socket-service.service';
@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  products$ = new BehaviorSubject<any>([])
  message: any
  productsList = []
  private subscriptions: Subscription[] = [];
  constructor(
    private productsService: ProductsService,
    private socketService: SocketServiceService
  ) {


  }

  ngOnInit() {
    this.socketService.getMessage().subscribe(message => {
      this.message = (message);
      this.loadProducts()
    });
    this.loadProducts()
  }
  loadProducts() {
    const productsSub = this.productsService.getAllProducts().subscribe((data) => {
      this.productsList = data
      this.products$.next(this.productsList)
    })
    this.subscriptions.push(productsSub)
  }

  closeMessage() {
    this.message = ''
  }
}
