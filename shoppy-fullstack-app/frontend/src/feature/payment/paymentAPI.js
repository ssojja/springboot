import { axiosPost } from '../../utils/dataFetch.js';

export const getPayment = async () => {
    // userId, orderId, itemName, totalPrice ...
    const { userId } = JSON.parse(localStorage.getItem("logInInfo"));
    const url = "/payment/kakao/ready";
    const data = {
        "orderId" : "1234",
        "userId" : userId,
        "itemName" : "테스트 상품",
        "qty" : "10",
        "totalAmount" : "1000"
    }

    try {
        const kakaoReadyResult = await axiosPost(url, data);
        console.log("kakaoReadyResult => ", kakaoReadyResult);
        if(kakaoReadyResult.tid){
            // 새로운 페이지 연결
            window.location.href = kakaoReadyResult.next_redirect_pc_url;
        }

    } catch(error) {
        console.log("error :: ", error);
    }

}