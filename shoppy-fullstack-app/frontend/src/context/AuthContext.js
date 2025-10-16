import { createContext, useState } from "react";

// 1. Context 생성
export const AuthContext = createContext();

// 2. AuthContext를 사용하는 컴포넌트들의 범위를 정의
export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}