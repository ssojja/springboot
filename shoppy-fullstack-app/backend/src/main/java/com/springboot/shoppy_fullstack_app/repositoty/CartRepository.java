package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;

import java.util.List;

public interface CartRepository {
    int add(CartItem cartItem);
    CartItem checkQty(CartItem cartItem);
    int updateQty(CartItem cartItem);
    CartItem getCount(CartItem cartItem);
    List<CartListResponse> findList(CartItem cartItem);
    int deleteItem(CartItem cartItem);
}
