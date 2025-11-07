package com.springboot.shoppy_fullstack_app.entity;

import com.springboot.shoppy_fullstack_app.dto.CartItemDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "cart")
@Setter
@Getter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String size;
    private int qty;
    private int pid;
    private String id;
    private LocalDate cdate;
    
    // Dto <=> Entity 변환
    public CartItem() {}
    public CartItem(CartItemDto entity) {
        this.cid = entity.getCid();
        this.size = entity.getSize();
        this.qty = entity.getQty();
        this.pid = entity.getPid();
        this.id = entity.getId();
        this.cdate = LocalDate.now();
    }
}