import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { validateFormFields } from 'src/app/shared/utils/validation.util';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup
  selectedFile!: File;
  showFileError = false
  showAttributeError = false
  AttributeArray!: FormArray
  @Input() product: any;
  items$ = new BehaviorSubject<any>([]);
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.editProductForm = this.fb.group({
      title: new FormControl(this.product.title, [Validators.required]),
      tags: new FormControl(this.product.tags, [Validators.required]),
      attributes: new FormArray([]),
      price: new FormControl(this.product.price, [Validators.required]),
    })
    this.items$.next(this.product.tags)
    const attList = this.editProductForm.get('attributes') as FormArray
    const parsedResponse = JSON.parse(this.product.attributes[0]);

    console.log(parsedResponse, 'parsed response')
    parsedResponse.forEach((res: any) => {
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          attList.push(this.fb.group({
            key: new FormControl(key),
            value: new FormControl(res[key])
          }))
        }
      }
    })
    this.AttributeArray = attList
  }


  get f() {
    return this.editProductForm.controls;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getAttributes() {

    return (this.editProductForm.get('attributes') as FormArray).controls;
  }

  onAddAttribute() {
    const attributes = this.editProductForm.get('attributes') as FormArray;
    attributes.push(this.fb.group({
      key: new FormControl(''),
      value: new FormControl('')
    }))
  }
  onRemoveAttribute(i: any) {
    const attributes = this.editProductForm.get('attributes') as FormArray;
    attributes.removeAt(i)
  }
  onUpdateProduct() {
    if (!this.selectedFile) {
      this.showFileError = true
      return
    }
    if (this.editProductForm.invalid) {

      validateFormFields(this.editProductForm);
      if (this.editProductForm.get('attributes')?.invalid) {
        this.showAttributeError = true
      } else {
        this.showAttributeError = false
      }
      return
    }
    const attributesList = this.editProductForm.get('attributes')?.value
    const attributes = attributesList.map(({ key, value }: any) => ({ [key]: value }))
    console.log(attributes, 'att is here')

    // debugger
    const { title, price, tags } = this.editProductForm.value
    const fd = new FormData();
    fd.append('title', title);
    fd.append('price', price);
    fd.append('tags', tags)
    fd.append('photo', this.selectedFile);
    fd.append('attributes', JSON.stringify(attributes))
    this.productService.updateProduct(this.product._id, fd).subscribe((data) => {
      console.log(data, 'data from the create product is here')
      this.modal.close()
    })

  }

}
