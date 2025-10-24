package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Support;
import com.springboot.shoppy_fullstack_app.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/support")
public class SupportController {
    
    // 서비스 객체 가져오기
    private SupportService supportService;

    @Autowired
    public SupportController (SupportService supportService) {
        this.supportService = supportService;
    }

    @PostMapping("/list")
    public List<Support> list(@RequestBody Support support) {
        return supportService.findAll(support);
    }
}
