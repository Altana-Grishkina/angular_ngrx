import * as ProductActions from './actions/product-page.action';
import { Product } from "../product";
import { createReducer, on } from '@ngrx/store';
import {ProductApiAction, ProductPageAction} from './actions';

// inerface for the products slice of state
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageAction.toggleProductCode, (state): ProductState => {
        return {
          ...state,
          showProductCode: !state.showProductCode
      };
  }),
  on(ProductPageAction.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    };
  }),
  on(ProductPageAction.clearCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null
    };
  }),
  on(ProductPageAction.initializeCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: 0
    };
  }),
  on(ProductApiAction.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductApiAction.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  }),
  on(ProductApiAction.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map(
      item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductApiAction.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ProductApiAction.createProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map(
      item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductApiAction.createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  }),
 /*  on(ProductApiAction.deleteProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map(
      item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    }
  }),
  on(ProductApiAction.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  }) */
);
