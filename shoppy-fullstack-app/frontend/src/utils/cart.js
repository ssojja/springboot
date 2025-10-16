/**
 * 장바구니 아이템 수량 업데이트
 */
export function updateCartItemQty(cartItems, cid, type) {
    return cartItems.map((item)=>
        item.cid === cid ? 
                        ( type === "+" ? {...item, qty:item.qty+1 } : (item.qty > 1 ? {...item, qty:item.qty-1 } : item)) 
                        : item );
}

/**
 * 상품 총 금액 구하기
 */
export function getTotalPrice(products, items) {    // 원본 데이터값, 장바구니 데이터값
    // items(배열)의 누적합 ==> 배열.reduce((누적합acc, 현재값cur, 인덱스, 원본배열)=>{}, 초기값)
    return items.reduce((total, item)=> {
        const product = products.find((product) => item.pid === product.pid);
        return total + (item.qty * product.price);
    },0);
}

/**
 * 상품 리스트에서 이미지, 상품명, 가격 --> 장바구니 리스트에 추가하는 함수
 */
export function cartItemsAddInfo(products, items) {
    // const result = items.map((item)=> {    // []
    return items.map((item)=> {    // []
        // 상품에 있는지 체크
        const product = products.find((product) => item.pid === product.pid);
        return {
            ...item,
            image: product.image,
            name:product.name,
            info:product.info,
            price:product.price
        };  // map을 빠져나가는 return
    });
}

/**
 * 장바구니 수량 증가 체크 함수
 */
export function cartItemsCheck(prevItems, cartItem) {
    // 존재여부 체크
    const existItem = prevItems.find((item) => item.pid === cartItem.pid && item.size === cartItem.size);
    
    if(existItem){
        return prevItems.map((item)=> item.pid === cartItem.pid && item.size === cartItem.size ? {...item, qty:item.qty+1} : item);
    } else {
        const cid = Math.floor(Math.random()*1000000);
        
        return [...prevItems, {...cartItem, cid:cid }]; // 존재하지 않으면 새로운 item 추가
    }   
}