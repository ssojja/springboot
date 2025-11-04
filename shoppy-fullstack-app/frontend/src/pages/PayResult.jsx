import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLogOut } from '../feature/auth/authAPI.js';
import { logIn } from '../feature/auth/authSlice.js';

export function PayResult() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");
  const userId = searchParams.get("userId");
  const dispatch = useDispatch();

  useEffect(() => {
        if (status === "success") dispatch(logIn({ "userId": userId }));
        else dispatch(getLogOut());
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>결제 결과 페이지</h2>
      <p><b>주문번호:</b> {orderId}</p>
      <p><b>결제 상태:</b> {status}</p>

      {status === "success" ? (
        <p style={{ color: "green" }}>✅ 결제가 정상적으로 완료되었습니다!</p>
      ) : (
        <p style={{ color: "red" }}>❌ 결제에 실패했습니다.</p>
      )}
    </div>
  );
}