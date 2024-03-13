import {ProductState } from "../products/state/product.reducer";

// here is defined the complete structure of the state in our store
export interface State {
  // it has 2 feature slices
  products: ProductState;
  user: any;
}
