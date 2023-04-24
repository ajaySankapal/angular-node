import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../shared/services/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  products$ = new BehaviorSubject<any>([])
  productsList = []
  private subscriptions: Subscription[] = [];


  constructor(
    private productsService: ProductsService,
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    const productsSub = this.productsService.getAllProducts().subscribe((data) => {
      this.productsList = data
      console.log(data, 'products data')
      this.products$.next(this.productsList)
    })
    this.subscriptions.push(productsSub)
  }

  onDelete(id: string) {
    const productDeleteSub = this.productsService.deleteProduct(id).subscribe((data) => {
      console.log(data)
      this.loadProducts()
    })
    this.subscriptions.push(productDeleteSub)
  }

  onEdit(product: any) {
    const modalRef = this.modalService.open(EditProductComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
    modalRef.result.then(
      () => this.loadProducts(),
      () => { }
    );
  }

  onCreateProduct() {
    const modalRef = this.modalService.open(CreateProductComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      () => this.loadProducts(),
      () => { }
    );
  }



}
