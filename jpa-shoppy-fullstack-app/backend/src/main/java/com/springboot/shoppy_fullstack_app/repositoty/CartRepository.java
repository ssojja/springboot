package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.CartItemDto;
import com.springboot.shoppy_fullstack_app.dto.CartListResponseDto;

import java.util.List;

public interface CartRepository {
    int add(CartItemDto cartItem);
    CartItemDto checkQty(CartItemDto cartItem);
    int updateQty(CartItemDto cartItem);
    CartItemDto getCount(CartItemDto cartItem);
    List<CartListResponseDto> findList(CartItemDto cartItem);
    int deleteItem(CartItemDto cartItem);
}
