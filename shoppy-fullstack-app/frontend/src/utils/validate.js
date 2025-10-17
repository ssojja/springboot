/**
 *  Shoppy 로그인 폼 체크
 */
export const validateFormCheck = ({idRef, pwdRef, errors, setErrors}) => {
    if(idRef.current.value === ""){
        setErrors({...errors, id:"아이디를 입력해주세요."});
        idRef.current.focus();
        return false;
    } else if(pwdRef.current.value === ""){
        setErrors({...errors, pwd:"패스워드를 입력해주세요."});
        pwdRef.current.focus();
        return false;
    }
    return true;
}

/**
 *  로그인 폼 체크
 */
export function validateLoginCheck(refs, setMsg) {
    // validation check (유효성 체크)
    if(refs.idref.current.value === ""){
        // alert('아이디를 입력해주세요.');     // 방법1
        setMsg({id:'아이디를 입력해주세요.'});    // 방법2
        // refs.msgIdref.current.innerText = ('아이디를 입력해주세요.');    // 방법3
        refs.idref.current.focus();
        return false;
    } else if(refs.passref.current.value === ""){
        // alert('패스워드를 입력해주세요.');
        setMsg({pass:'패스워드를 입력해주세요.'});    // 방법2
        // refs.msgPassRef.current.innerText = ('패스워드를 입력해주세요.');
        refs.passref.current.focus();
        return false;
    }
    return true;
}

/**
 * Shoppy 회원가입 폼 체크
 */
export function validateSignupFormCheck({refs, setErrors}) {
    if(refs.idRef.current.value === "") {
        setErrors({id: "아이디를 입력해주세요"});
        refs.idRef.current.focus();
        return false;
    } else if(refs.emailDomainRef.current.value === "default") {
        setErrors({emailDomain: "이메일 주소를 선택해주세요"});
        refs.emailDomainRef.current.focus();
        return false;
    }
    return true;
}