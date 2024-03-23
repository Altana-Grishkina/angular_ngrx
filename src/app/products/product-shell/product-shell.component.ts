import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { getShowProductCode, State, getCurrentProduct, getProducts, getError } from '../state';
import { ProductPageAction} from '../state/actions';


@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageAction.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }



  checkChanged(): void {
    this.store.dispatch(ProductPageAction.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageAction.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageAction.setCurrentProduct({ currentProductId: product.id }));
  }
}
