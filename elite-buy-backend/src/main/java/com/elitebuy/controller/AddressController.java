package com.elitebuy.controller;

import com.elitebuy.Exception.UserException;
import com.elitebuy.model.Address;
import com.elitebuy.model.User;
import com.elitebuy.service.AddressService;
import com.elitebuy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping("/get")
    public ResponseEntity<List<Address>> getUserAddress(
            @RequestHeader("Authorization") String jwt ) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Address> addresses = addressService.findAddressById(user.getId());

        return ResponseEntity.ok(addresses);
    }
}
