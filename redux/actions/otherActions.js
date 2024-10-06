import axios from "axios";
import { server } from "../store";

export const updatePic = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePicRequest",
        });

        const { data } = await axios.put(
            `${server}/user/updatepic`,

            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        dispatch({
            type: "updatePicSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "updatePicFail",
            payload: error.response.data.message,
        });
    }
};

export const addCategory = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "addCategoryRequest",
        });
    
        const { data } = await axios.post(`${server}/category/new`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
    
        dispatch({
            type: "addCategorySuccess",
            payload: data.message,
        });
        } catch (error) {
        dispatch({
            type: "addCategoryFail",
            payload: error.response.data.message,
        });
    }
};

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllCategoriesRequest",
        });
    
      // Axios request
    
        const { data } = await axios.get(
            `${server}/category/all`,
    
            {
            withCredentials: true,
            }
        );
    
        dispatch({
            type: "getAllCategoriesSuccess",
            payload: data.categories,
        });
        console.log(data)
        } catch (error) {
        console.log("chat action error", error);
    
        dispatch({
            type: "getAllCategoriesFail",
            payload: error.response.data.message,
        });
    }
};

export const deleteProductImage = (productId, imageId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductImageRequest",
        });
    
        const { data } = await axios.delete(
            `${server}/product/images/${productId}?id=${imageId}`,
            {
            withCredentials: true,
            }
        );
    
        dispatch({
            type: "deleteProductImageSuccess",
            payload: data.message,
        });
        } catch (error) {
        dispatch({
            type: "deleteProductImageFail",
            payload: error.response.data.message,
        });
    }
};

export const getCategoryDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getCategoryDetailsRequest",
        })
        const { data } = await axios.get(`${server}/category/single/${id}`, {
            withCredentials: true
        })
        
        console.log("Category details fetched successfully:", data.category);
        
        dispatch({
            type: "getCategoryDetailsSuccess",
            payload: data.category
        })
    } catch (error) {
        
        dispatch({
            type: "getCategoryDetailsFail",
            payload: error.response.data.message
        })
    }
}

export const updateCategory =
    (id, category) => async (dispatch) => {
        try {
        dispatch({
            type: "updateCategoryRequest",
        });
        const { data } = await axios.put(
            `${server}/category/single/${id}`,
            {
            category,
            },
            {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            }
        );

        dispatch({
            type: "updateCategorySuccess",
            payload: data.message,
        });
        } catch (error) {
        dispatch({
            type: "updateProductFail",
            payload: error.response.data.message,
        });
    }
};

export const updateProduct =
  (id, name, description, price, stock, category) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProductRequest",
      });
      const { data } = await axios.put(
        `${server}/product/single/${id}`,
        {
          name,
          description,
          price,
          stock,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProductFail",
        payload: error.response.data.message,
      });
    }
  };

  export const updateProductImage = (productId, formData) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProductImageRequest",
      });
  
      const { data } = await axios.post(
        `${server}/product/images/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "updateProductImageSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProductImageFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
        type: "deleteCategoryRequest",
        });

        const { data } = await axios.delete(
        `${server}/category/single/${id}`,

        {
            withCredentials: true,
        }
        );
        dispatch({
        type: "deleteCategorySuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "deleteCategoryFail",
        payload: error.response.data.message,
        });
    }
};

export const updateCategoryImage = (categoryId, formData) => async (dispatch) => {
    try {
        dispatch({
        type: "updateCategoryImageRequest",
        });

        const { data } = await axios.post(
        `${server}/category/images/${categoryId}`,
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        );

        dispatch({
        type: "updateCategoryImageSuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "updateCategoryImageFail",
        payload: error.response.data.message,
        });
    }
};

export const deleteCategoryImage = (categoryId, imageId) => async (dispatch) => {
    try {
        dispatch({
        type: "deleteCategoryImageRequest",
        });

        const { data } = await axios.delete(
        `${server}/category/images/${categoryId}?id=${imageId}`,
        {
            withCredentials: true,
        }
        );

        dispatch({
        type: "deleteCategoryImageSuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "deleteCategoryImageFail",
        payload: error.response.data.message,
        });
    }
};

export const updatePassword =
    (oldPassword, newPassword) => async (dispatch) => {
        try {
            dispatch({
                type: "updatePasswordRequest",
            });

            const { data } = await axios.put(
                `${server}/user/changepassword`,
                {
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            dispatch({
                type: "updatePasswordSuccess",
                payload: data.message,
            });
        } catch (error) {
            dispatch({
                type: "updatePasswordFail",
                payload: error.response.data.message,
            });
        }
    };

export const updateProfile =
    (name, email, address, city, country, pinCode) => async (dispatch) => {
        try {
            dispatch({
                type: "updateProfileRequest",
            });

            const { data } = await axios.put(
                `${server}/user/updateprofile`,
                {
                    name,
                    email,
                    address,
                    city,
                    country,
                    pinCode,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            dispatch({
                type: "updateProfileSuccess",
                payload: data.message,
            });
        } catch (error) {
            dispatch({
                type: "updateProfileFail",
                payload: error.response.data.message,
            });
        }
    };

export const getAllProducts = (keyword, category) => async (dispatch) => {

    try {
        dispatch({
            type: "getAllProductsRequest",
        });

        // Axios request

        const { data } = await axios
            .get(`${server}/product/all?keyword=${keyword}&category=${category}`,
        
            {
                withCredentials: true
            })

        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products
        })

    } catch (error) {
        
        dispatch({
            type: "getAllProductsFail",
            payload: error.response.data.message
        })
    }

}

export const getAdminProducts = () => async (dispatch) => {
    
    try {
        dispatch({
            type: "getAdminProductsRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/product/admin`,
        
        {
            withCredentials: true
        })

        dispatch({
            type: "getAdminProductsSuccess",
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: "getAdminProductsFail",
            payload: error.response.data.message
        })
    }

}

export const getProductDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getProductDetailsRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/product/single/${id}`,
        
        {
            withCredentials: true
        })

        dispatch({
            type: "getProductDetailsSuccess",
            payload: data.product
        })

    } catch (error) {
        
        dispatch({
            type: "getProductDetailsFail",
            payload: error.response.data.message
        })
    }

}

export const getAllReviews = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getAllReviewsRequest",
        });

        const { data } = await axios.get(`${server}/comment/all/${id}`, {
            withCredentials: true
        });

        dispatch({
            type: "getAllReviewsSuccess",
            payload: data.comment
        });

        console.log(data)

    } catch (error) {
        
        dispatch({
            type: "getAllReviewsFail",
            payload: error.response.data.message
        });
    }
};
export const deleteProduct = (productId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteUserRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/product/single/${productId}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "deleteProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteProductFail",
        payload: error.response.data.message,
      });
    }
  };

  export const createProduct = (formData) => async (dispatch) => {
    try {
      dispatch({
        type: "addProductRequest",
      });
  
      const { data } = await axios.post(`${server}/product/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      dispatch({
        type: "addProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "addProductFail",
        payload: error.response.data.message,
      });
    }
  };


    export const fetchChart1Data = () => async (dispatch) => {
        try {
          dispatch({
            type: "fetchChart1DataRequest",
          });
      
          const { data } = await axios.get(
            `${server}/order/Orders-Details-Count`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
      
          dispatch({
            type: "fetchChart1DataSuccess",
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: "fetchChart1DataFail",
            payload: error.response.data.message,
          });
        }
      };
export const fetchChart2Data = () => async (dispatch) => {
try {
    dispatch({
    type: "fetchChart2DataRequest",
    });

    const { data } = await axios.get(`${server}/order/Orders-Sum-By-Month`, {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    });

    dispatch({
    type: "fetchChart2DataSuccess",
    payload: data,
    });
} catch (error) {
    dispatch({
    type: "fetchChart2DataFail",
    payload: error.response.data.message,
    });
}
};
export const fetchChart3Data = () => async (dispatch) => {
try {
    dispatch({
    type: "fetchChart3DataRequest",
    });

    const { data } = await axios.get(`${server}/order/Most-Ordered-Product`, {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    });

    dispatch({
    type: "fetchChart3DataSuccess",
    payload: data,
    });
} catch (error) {
    dispatch({
    type: "fetchChart3DataFail",
    payload: error.response.data.message,
    });
}
};