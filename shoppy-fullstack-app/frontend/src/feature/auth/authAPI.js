import { logIn, logOut } from './authSlice.js';
import { validateFormCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';

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