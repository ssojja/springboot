import { logIn, logOut } from './authSlice.js';
import { validateFormCheck, validateSignupFormCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';
/* IdCheck */
export const getIdCheck = (id) => async (dispatch) => {
    const data = { "id" : id };
    const url = "http://localhost:8080/member/idCheck";
    const result = await axiosPost(url, data);
    return result;
}

/** Signup */
export const getSignup = (formData, param) => async (dispatch) => {
    let result = null;
    if(validateSignupFormCheck(param)){
        /**
            스프링부트 연동 - Post, /member/signup
        */
        const url = "http://localhost:8080/member/signup";
        result = await axiosPost(url, formData);
    }
    return result;
}

/** Login */
export const getLogIn = (formData, param) => async (dispatch) => {
    if(validateFormCheck(param)){
        /**
            SpringBoot - @RestController, @PostMapping("/member/login")
            axios api 사용
        */
        const url = "http://localhost:8080/member/login";
        const result = await axiosPost(url, formData);

        if(result){
            dispatch(logIn({"userId":formData.id}));
            return true;
        }
    }
    return false;
}

export const getLogOut = () => async (dispatch) => {
    dispatch(logOut());
    return true;
}