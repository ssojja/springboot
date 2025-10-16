package com.springboot.study.controller;

import com.springboot.study.dto.Member;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/member")
@RestController // 내부에 @ResponseBody가 포함, Map 객체 생성 없이 JSON 객체 바로 전송
public class MemberRestController {
    @PostMapping("/restLogin")
    public Map<String, Object> restLogin(@RequestBody Member member) {
        boolean result = false;
        if(member.getId().equals("test") && member.getPass().equals("1234")) result = true;

        // Map 객체(key, value)를 생성하여 전송 --> 자동으로 JSON 객체로 변환
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", result);
        response.put("member", member);
//
        // ResponseBody가 있는 경우, 호출한 페이지로 문자열 or JSON 객체로 전송
//        return response;    // { "result" : true }
        return response;
    }

    @PostMapping("/restSignup")
    public Member restSignup(@RequestBody Member member) {

        return member;
    }
}
