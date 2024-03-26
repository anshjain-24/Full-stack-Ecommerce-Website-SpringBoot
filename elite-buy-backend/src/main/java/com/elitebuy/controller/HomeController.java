package com.elitebuy.controller;

import com.elitebuy.Response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getHomePage(){
        ApiResponse res = new ApiResponse();
        res.setMessage("welcome to elite buy online shopping portal backend");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
