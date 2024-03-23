import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from './actions/product-page.action';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductApiAction, ProductPageAction } from './actions';

@Injectable()
export class ProductEffects {
  constructor(
    private action$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductPageAction.loadProducts),
      mergeMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map((products) => ProductApiAction.loadProductsSuccess({ products })),
            catchError(error => of(ProductApiAction.loadProductsFailure({ error })))
          )
      )
    );
  });

  updateProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductPageAction.updateProduct),
      concatMap(action =>
        this.productService
          .updateProduct(action.product)
          .pipe(
            map(product => ProductApiAction.updateProductSuccess({ product })),
            catchError(error => of(ProductApiAction.updateProductFailure({ error })))
          )
      )
    );
  });

  createProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductPageAction.createProduct),
      concatMap(action =>
        this.productService
          .createProduct(action.product)
          .pipe(
            map(product => ProductApiAction.createProductSuccess({ product })),
            catchError(error => of(ProductApiAction.createProductFailure({ error })))
          )
      )
    );
  });

 /*  deleteProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductPageAction.deleteProduct),
      mergeMap(action =>
        this.productService
          .deleteProduct(action.productId)
          .pipe(
            map(() => ProductApiAction.deleteProductSuccess({ productId: action.productId })),
            catchError(error => of(ProductApiAction.createProductFailure({ error })))
          )
      )
    );
  }); */
}
