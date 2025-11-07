package com.springboot.shoppy_fullstack_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
public class CartCheckQtyDto {
    private int cid;
    private Long count;
    
    // 클래스 필드에 데이터를 객체에 주입(Injection) 방법 2가지
    // 1. 생성자
    // 2. 기본 생성자 + Setter 메소드
//    public CartCheckQtyDto() {}
//    public CartCheckQtyDto(int cid, Long count) {
//        this.cid = cid;
//        this.count = count;
//    }
}
