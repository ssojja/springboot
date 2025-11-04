package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.Member;

import java.util.Optional;

public interface MemberRepository {
    int save(Member member);
    String login(String id);
    Long findById(String id);
    Optional<Member> findByMember(String id);
}
