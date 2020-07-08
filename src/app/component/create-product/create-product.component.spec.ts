import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check form is not valid' , () => {
     expect(component.form.valid).toBe(false);
  });


  describe('form field validation', () => {
      let ch;
      beforeEach(() => {
        ch = component.t.controls[0] as FormGroup;
        ch.setValue({
           name: 'test',
            description: 'test',
            price: 10,
            category: 'Electonics',
            imageUrl: 'http://www.test.png',
            phoneNumber: 9999999999,
            select: ''
          });
      });

      it('name is valid', () => {
        expect(ch.get('name').valid).toBe(true);
      });
      it('description is valid', () => {
        expect(ch.get('description').valid).toBe(true);
      });
      it('price is valid', () => {
        expect(ch.get('price').valid).toBe(true);
      });
      it('category is valid', () => {
        expect(ch.get('category').valid).toBe(true);
       });
      it('imageUrl is valid', () => {
        expect(ch.get('imageUrl').valid).toBe(true);
       });
      it('phoneNumber is valid', () => {
        expect(ch.get('phoneNumber').valid).toBe(true);
       });
      it('select is valid', () => {
        expect(ch.get('select').valid).toBe(true);
      });
      it('form is valid', () => {
        expect(component.form.valid).toBe(true);
      });
    });


  describe('Add new product functionality', () => {
    let ch;
    beforeEach(() => {
      component.addNewProduct();
      ch = component.t.controls[0] as FormGroup;
      ch.setValue({
         name: 'test',
          description: 'test',
          price: 10,
          category: 'Electonics',
          imageUrl: 'http://www.test.png',
          phoneNumber: 9999999999,
          select: ''
        });
    });

    it('should have length 2', () => {
       expect(component.t.controls.length).toBe(2);
    });
  });

  describe('Reset button  and submit functionality', () => {
    let ch;
    beforeEach(() => {
      component.addNewProduct();
      ch = component.t.controls[0] as FormGroup;
      ch.setValue({
         name: 'test',
          description: 'test',
          price: 10,
          category: 'Electonics',
          imageUrl: 'http://www.test.png',
          phoneNumber: 9999999999,
          select: ''
        });
    });

    afterEach(() => {
      window.localStorage.removeItem('productList');
    });

    it('should have length 1', () => {
       component.resetForm();
       expect(component.t.controls.length).toBe(1);
    });
    it('should set value in localStorage', () => {
      component.onSubmit();
      const item = window.localStorage.getItem('productList');
      expect(item).toBeTruthy();
    });
  });

});
