import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux';
import { getLogOut } from '../../feature/auth/authAPI.js';

export function Header() {
    // const { isLogin } = useContext(AuthContext);
    // const { handleLogout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.cartCount);
    const isLogIn = useSelector((state) => state.auth.isLogIn);
    let userId = null;
    if(isLogIn) userId  = JSON.parse(localStorage.getItem("logInInfo")).userId;

    const handleLogOut = () => {
        const succ = dispatch(getLogOut());
//         const logInInfo = localStorage.getItem("logInInfo");
        if(succ) {
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    }

    return (
        <div className="header-outer">
            <div className="header">
                <Link to="/" className="header-left">
                    <FiShoppingBag />
                    <span>Jpa-Shoppy-redux(toolkit)::fullstack</span>
                </Link>
                <nav className="header-right">
                    {isLogIn && <span>[{userId}]</span>}
                    <Link to="/all">Products</Link>
                    <Link to="/cart" className="header-icons-cart-link">
                        <GiShoppingCart className="header-icons"/>
                        <span className="header-icons-cart">{cartCount}</span>
                    </Link>
                    { !isLogIn && 
                        <Link to="/login">
                            <button type="button">Login</button>
                        </Link>                    
                    }
                    { isLogIn &&
                        <button type="button"
                                onClick={handleLogOut}>Logout</button>
                    }
                    <Link to="/signup">
                        <button type="button">Signup</button>
                    </Link>    
                    { isLogIn &&
                        <Link to="/support">
                            <button type="button">Support</button>
                        </Link>                   
                    }              
                </nav>
            </div>
        </div>
    );
}