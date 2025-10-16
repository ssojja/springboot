import '../styles/cgvSignup.css';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { validateSignupFormCheck } from '../utils/validate.js';
import { initForm } from '../utils/init.js';
import { axiosPost } from '../utils/dataFetch.js';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const navigate = useNavigate();
    const initArray = ['id', 'pwd', 'cpwd', 'name', 'phone', 'emailName', 'emailDomain'];
    // const initForm = initArray.reduce((acc, cur) => {    // 비동기
    //     acc[cur] = "";
    //     return acc;
    // },{});

    const refs = useMemo(() => {    // Hooks 비동기식 처리 진행
        return initArray.reduce((acc, cur) => {
            acc[`${cur}Ref`] = React.createRef();
            return acc;
        },{});
    })

    const [form, setForm] = useState(initForm(initArray));
    const [errors, setErrors] = useState({...initForm(initArray), emailDomain:""});

    const handleReset = () => {
        setForm(initForm(initArray));
    }

    const handleChangeForm = (event) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value});
        setErrors({...initForm(initArray), emailDomain:""});

        // callback
        // setForm((prev) => {prev, [name, value]});
    }

    const handleIdCheck = async () => {
        const url = "http://localhost:8080/member/idCheck";
        const data = { "id" : form.id };
        const result = await axiosPost(url, data);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 객체 형태로 묶어서 넘길 수 있음
        const param = { refs:refs, errors: setErrors }
        console.log(`param.errors`, param.errors);

        if(validateSignupFormCheck(param)){
            /**
                스프링부트 연동 - Post, /member/signup
            */

            const url = "http://localhost:8080/member/signup";
            const formData = { ...form, email: form.emailName.concat('@', form.emailDomain)}
            console.log('FormData ====> ', formData);

            const result = await axiosPost(url, formData);
            if(result) {
                alert("회원가입에 성공하셨습니다.");
                navigate("/login");
            } else {
                alert("회원가입에 실패하셨습니다.");
            }
        }
    }

    // console.log("form --> ",form)

    return (
    <div className="content">
        <div className="join-form center-layout">
            <h1 className="center-title">회원가입(React)</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label htmlFor="" ><b>아이디</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.id}</span>
                        <div>
                            <input type="text" 
                                    name="id"
                                    value={form.id}                        
                                    placeholder = "아이디 입력(6~20자)"
                                    ref={refs.idRef}
                                    onChange={handleChangeForm}/>
                            <button type="button" 
                                  onClick={handleIdCheck}> 중복확인</button>
                            <input type="hidden" id="idCheckResult" value="default" />
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>비밀번호</b></label>
                        <div>
                            <input type="password" 
                                    name="pwd"
                                    value={form.pwd}
                                    placeholder="비밀번호 입력(문자,숫자,특수문자 포함 6~12자)"
                                    onChange={handleChangeForm}
                                    ref={refs.pwdRef}/>
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>비밀번호 확인</b></label>
                        <div>
                            <input type="password" 
                                    name="cpwd"
                                    value={form.cpwd}
                                    placeholder="비밀번호 재입력"
                                    onChange={handleChangeForm}
                                    ref={refs.cpwdRef}/>
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>이름</b></label>
                        <div>
                            <input type="text" 
                                    name="name"
                                    value={form.name}
                                    placeholder="이름을 입력해주세요"
                                    onChange={handleChangeForm}
                                    ref={refs.nameRef}/>
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>전화번호</b></label>
                        <div>
                            <input type="text" 
                                    name="phone"
                                    value={form.phone}
                                    placeholder="휴대폰 번호 입력('-' 포함)"
                                    onChange={handleChangeForm}
                                    ref={refs.phoneRef}/>
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>이메일 주소</b></label>
                        <span style={{color:"red", fontSize:"0.8rem"}}>{errors.emailDomain}</span>
                        <div>
                            <input type="text" 
                                    name="emailName"
                                    value={form.emailName}
                                    placeholder="이메일 주소"
                                    onChange={handleChangeForm}
                                    ref={refs.emailNameRef}/>
                            <span>@</span>       
                            <select name="emailDomain" value={form.emailDomain}
                                    ref={refs.emailDomainRef}
                                    onChange={handleChangeForm}>
                                <option value="default">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <button type="submit">가입하기</button>
                        <button type="reset" onClick={handleReset}>다시쓰기</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    );
}

