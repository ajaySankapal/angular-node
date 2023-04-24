import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Socket } from 'ngx-socket-io';
import { SocketServiceService } from 'src/app/shared/services/socket-service.service';
import { validateFormFields } from 'src/app/shared/utils/validation.util';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup
  selectedFile!: File;
  showFileError = false
  showAttributeError = false
  AttributeArray!: FormArray
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private productService: ProductsService,
    private socket: Socket,
    private socketService: SocketServiceService
  ) { }

  ngOnInit() {
    this.createProductForm = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      attributes: new FormArray([]),
      price: new FormControl(null, [Validators.required]),
    })
    const attributes = this.createProductForm.get('attributes') as FormArray;
    attributes.push(this.fb.group({
      key: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    }))
    this.AttributeArray = attributes

  }

  get f() {
    return this.createProductForm.controls;
  }

  onFileSelected(event: any) {
    this.showFileError = false
    this.selectedFile = event.target.files[0];
  }

  onAddProduct() {
    debugger
    if (this.createProductForm.invalid) {
      this.selectedFile ? '' : this.showFileError = true
      validateFormFields(this.createProductForm);
      if (this.createProductForm.get('attributes')?.invalid) {
        this.showAttributeError = true
      } else {
        this.showAttributeError = false
      }
      return
    }
    const attributesList = this.createProductForm.get('attributes')?.value
    const formGroup = attributesList.at(0) as FormGroup;

    const attributes = attributesList.map(({ key, value }: any) => ({ [key]: value }))
    console.log(attributes, 'att is here')


    const fd = new FormData();
    fd.append('title', this.createProductForm.get('title')?.value);
    fd.append('price', this.createProductForm.get('price')?.value);
    fd.append('tags', (this.createProductForm.get('tags')?.value))
    fd.append('photo', this.selectedFile);
    fd.append('attributes', JSON.stringify(attributes))

    this.productService.addProduct(fd).subscribe((data) => {
      if (data.success) {
        this.modal.close()
      }
    })

  }
  getAttributes() {
    return (this.createProductForm.get('attributes') as FormArray).controls;
  }

  onAddAttribute() {
    this.showAttributeError = false
    const attributes = this.createProductForm.get('attributes') as FormArray;
    attributes.push(this.fb.group({
      key: new FormControl(''),
      value: new FormControl('')
    }))
  }

  onRemoveAttribute(i: any) {
    const attributes = this.createProductForm.get('attributes') as FormArray;
    attributes.removeAt(i)
  }



}
