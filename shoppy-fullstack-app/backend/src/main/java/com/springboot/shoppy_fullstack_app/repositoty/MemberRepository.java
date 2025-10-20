package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.Member;

public interface MemberRepository {
    public int save(Member member);
    public String login(String id);
    public Long findById(String id);
}
