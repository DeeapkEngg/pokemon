import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListDetailComponent } from './product-list-detail.component';

describe('ProductListDetailComponent', () => {
  let component: ProductListDetailComponent;
  let fixture: ComponentFixture<ProductListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
