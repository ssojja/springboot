import { logIn, logOut } from './authSlice.js';
import { validateFormCheck, validateSignupFormCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';
import { getCartCount } from '../../feature/cart/cartAPI.js';
import { updateCartCount, resetCartCount } from '../../feature/cart/cartSlice.js';
import { refreshCsrfToken } from '../csrf/manageCsrfToken.js';

/* Id 중복 체크 */
export const getIdCheck = (id) => async (dispatch) => {
    const data = { "id" : id };
    const url = "/member/idcheck";
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
        const url = "/member/signup";
        result = await axiosPost(url, formData);
    }
    return result;
}

/** LogIn */
export const getLogIn = (formData, param) => async (dispatch) => {
    if(validateFormCheck(param)){
        /**
            SpringBoot - @RestController, @PostMapping("/member/login")
            axios api 사용
        */
//        const url = "http://localhost:8080/member/login";
        const url = "/member/login";    // 프록시를
        const result = await axiosPost(url, formData);
        console.log("result :: ", result);

        if(result.login){
            await refreshCsrfToken();
            dispatch(logIn({"userId":formData.id}));

            // 장바구니 카운트 함수 호출
//            const count = await getCartCount(formData.id);
            dispatch(getCartCount(formData.id));
            return true;
        }
    }
    return false;
}

/** LogOut */
export const getLogOut = () => async (dispatch) => {
    const url = "/member/logout";
    const result = await axiosPost(url, {});
    if(result){
        await refreshCsrfToken();
        dispatch(logOut());
        dispatch(resetCartCount());
    }
    return result;
}