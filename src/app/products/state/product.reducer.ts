import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toogle Product Code'), state => {
    console.log('original state: ' + JSON.stringify(state));
        return {
          ...state,
          showProductCode: !state.showProductCode
      };
  })
);
