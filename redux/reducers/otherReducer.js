import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    chartData: [],
    chartData2: [],
    chartData3: [],
    users: [],
    user: {},
    loading: false,
    error: null,
    category: {},
};

export const otherReducer = createReducer(initialState, (builder) => {
    builder
    // START UPDATE PIC
        .addCase("updatePicRequest", (state) => {
            state.loading = true;
        })
        .addCase("updatePicSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updatePicFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase("getAllCategoriesRequest", (state) => {
            state.loading = true;
        })
        .addCase("getAllCategoriesSuccess", (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase("getAllCategoriesFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase("addCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("addCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("addCategoryFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Delete category
        .addCase("deleteCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deleteCategoryFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        // Update Category
        .addCase("updateCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateCategoryFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Update Category Images
        .addCase("updateCategoryImageRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateCategoryImageSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateCategoryImageFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Delete Category Images
        .addCase("deleteCategoryImageRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteCategoryImageSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deleteCategoryImageFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Get Category
        .addCase("getCategoryDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getCategoryDetailsSuccess", (state, action) => {
            state.loading = false;
            state.category = action.payload;
        })
        .addCase("getCategoryDetailsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //  UPDATE PROFILE
        .addCase("updateProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateProfileFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // UPDATE PASSWORD
        .addCase("updatePasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updatePasswordFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase("addProductRequest", (state) => {
            state.loading = true;
            state.error = action.payload;
        })
    
        .addCase("updateProductRequest", (state) => {
            state.loading = true;
            state.error = action.payload;
        })
        .addCase("updateProductImageRequest", (state) => {
            state.loading = true;
            state.error = action.payload;
        })
        .addCase("deleteProductImageRequest", (state) => {
            state.loading = true;
            state.error = action.payload;
        })
        .addCase("deleteProductRequest", (state) => {
            state.loading = true;
            state.error = action.payload;
        })

        //Charts
        .addCase("fetchChart1DataRequest", (state) => {
            state.loading = true;rv
          })
          .addCase("fetchChart1DataSuccess", (state, action) => {
            state.loading = false;
            state.chartData = action.payload;
          })
          .addCase("fetchChart1DataFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase("fetchChart2DataRequest", (state) => {
            state.loading = true;
          })
          .addCase("fetchChart2DataSuccess", (state, action) => {
            state.loading = false;
            state.chartData2 = action.payload;
          })
          .addCase("fetchChart2DataFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase("fetchChart3DataRequest", (state) => {
            state.loading = true;
          })
          .addCase("fetchChart3DataSuccess", (state, action) => {
            state.loading = false;
            state.chartData3 = action.payload;
          })
          .addCase("fetchChart3DataFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    
    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });





    
});



