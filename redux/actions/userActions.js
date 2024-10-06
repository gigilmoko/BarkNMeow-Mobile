import { server } from "../store"
import axios from "axios"

export const register = (formData) => async (dispatch) => {

    try {
        dispatch({
            type: "registerRequest",
        })

        // Axios request
        console.log(formData._parts[8][1])
        const { data } = await axios.post(`${server}/user/new`,

            formData
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })

        dispatch({
            type: "registerSuccess",
            payload: data.message
        })

        return 'success';
    } catch (error) {
        console.log(error);
        const errorMessage = error.response ? error.response.data.message : 'Network error';
        dispatch({
            type: "registerFail",
            payload: errorMessage
        });
        return 'fail';
    }

}

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: "loginRequest",
        })

        // Axios request

        const { data } = await axios.post(`${server}/user/login`, {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })

        dispatch({
            type: "loginSuccess",
            payload: data.message
        })
        return data.message;
    } catch (error) {

        dispatch({
            type: "loginFail",
            payload: error.response.data.message
        })
        throw error;
    }

}

export const loadUser = () => async (dispatch) => {

    try {
        dispatch({
            type: "loadUserRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/user/me`,

            {
                withCredentials: true
            })

        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })

    } catch (error) {

        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message
        })
    }

}

export const logout = () => async (dispatch) => {

    try {
        dispatch({
            type: "logoutRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/user/logout`,

            {
                withCredentials: true
            })

        dispatch({
            type: "logoutSuccess",
            payload: data.message
        })

    } catch (error) {

        dispatch({
            type: "logoutFail",
            payload: error.response.data.message
        })
    }

}

export const verifyToken = (idToken) => async (dispatch) => {
    try {
        dispatch({
            type: "verifyTokenRequest",
        })
        // Axios request
        const { data } = await axios.post(`${server}/user/verifyidtoken`, {
            idToken
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })

        dispatch({
            type: "verifyTokenSuccess",
            payload: data.message
        })

    } catch (error) {

        dispatch({
            type: "verifyTokenFail",
            payload: error.response.data
        })
    }
}

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

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest",
        });

        // Axios request

        const { data } = await axios.get(
            `${server}/user/admin/all`,

            {
                withCredentials: true,
            }
        );

        dispatch({
            type: "getAllUsersSuccess",
            payload: data.users,
        });
    } catch (error) {
        console.log("user action error", error);

        dispatch({
            type: "getAllUsersFail",
            payload: error.response.data.message,
        });
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteUserRequest",
        });

        const { data } = await axios.delete(
            `${server}/user/delete/${userId}`,
            {
                withCredentials: true,
            }
        );

        dispatch({
            type: "deleteUserSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteUserFail",
            payload: error.response.data.message,
        });
    }
};