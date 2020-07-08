import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
  productArr: FormArray;
  addButtonDisable = false;
  pattern = {
    alphaNumeric: '^[0-9A-Za-z]+$',
    number: '^[0-9]+[0-9]{9}$',
    decimal: '^[0-9]+(\.[0-9]{1,2})?$',
    url: '^http(s?)://[a-zA-Z0-9._&?=/-]+.(jpg|jpeg|png|gif)$'
  };
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){

  this.form = this.fb.group({
    productArr: this.fb.array([this.createFields()])
  });


  }
  onSubmit() {
    const productList =  window.localStorage.getItem('productList') || '[]';
    const formValues = this.form.get('productArr').value;
    const data =  JSON.parse(productList);
    formValues.forEach(formValue => data.push(formValue));
    window.localStorage.setItem('productList', JSON.stringify(data));
    this.resetForm();
  }

    // convenience getters for easy access to form fields
    get f() { return this.form.controls; }
    get t() { return this.f.productArr as FormArray; }

    checker(property: string, index: string) {
      const group =  this.t.controls[index] as FormGroup;
      return group.get(property);
    }

  resetForm($event = null) {
    if ($event) {
      $event.preventDefault();
    }
    this.createForm();
  }

  addNewProduct($event= null) {
    if ($event) { $event.preventDefault(); }
    const productArr = this.form.controls.productArr as FormArray;
    if (productArr.length < 5){
      productArr.push(this.createFields());
    } else {
      this.addButtonDisable = true;
    }
  }

  createFields() {
    const product = this.fb.group({
      name :
          this.fb.control('',
          [  Validators.required, Validators.minLength(3), Validators.pattern(this.pattern.alphaNumeric)]),
      description :
         this.fb.control('', [
          Validators.required, Validators.minLength(3), Validators.pattern(this.pattern.alphaNumeric)
         ]),
      price : this.fb.control('',
       [  Validators.required, Validators.pattern(this.pattern.decimal)]
      ),
      category : this.fb.control('',
        [ Validators.required]
      ),
      imageUrl : this.fb.control('',
      [  Validators.required, Validators.pattern(this.pattern.url) ]
      ),
      phoneNumber : this.fb.control('',
       [ Validators.required, Validators.maxLength(10) , Validators.pattern(this.pattern.number) ]
      ),
      select : this.fb.control(''),
  });
    return product;
  }
}
