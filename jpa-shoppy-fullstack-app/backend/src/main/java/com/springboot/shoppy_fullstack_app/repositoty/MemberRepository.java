package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.MemberDto;

import java.util.Optional;

public interface MemberRepository {
    int save(MemberDto member);
    String login(String id);
    Long findById(String id);
    Optional<MemberDto> findByMember(String id);
}
