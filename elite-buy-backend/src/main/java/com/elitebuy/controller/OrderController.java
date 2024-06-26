package com.elitebuy.controller;

import com.elitebuy.Exception.OrderException;
import com.elitebuy.Exception.UserException;
import com.elitebuy.model.Address;
import com.elitebuy.model.Order;
import com.elitebuy.model.User;
import com.elitebuy.service.EmailService;
import com.elitebuy.service.OrderService;
import com.elitebuy.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.util.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvoiceController invoiceController;

    @Autowired
    private EmailService emailService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,
                                             @RequestHeader("Authorization") String jwt) throws UserException, IOException, MessagingException {
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrder(user,shippingAddress);
        System.out.println("order : "+ order);
        return new ResponseEntity<Order>(order, HttpStatus.CREATED);
    }

    @PostMapping("/withAddressId")
    public ResponseEntity<Order> createReOrder(@RequestBody Long id,
                                               @RequestHeader("Authorization") String jwt) throws UserException, IOException, MessagingException {
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrderWithStoredAddress(user,id);
        System.out.println("order : "+ order);
        return new ResponseEntity<Order>(order,HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> useOrderHistory(
            @RequestHeader("Authorization") String jwt ) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Order> orders = orderService.userOrderHistory(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.CREATED);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Order> findOrderById(
            @PathVariable("Id") Long orderId,
            @RequestHeader("Authorization") String jwt) throws UserException, OrderException{
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);
        return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
    }
}
