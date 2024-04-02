package com.elitebuy.service;

import com.elitebuy.Exception.OrderException;
import com.elitebuy.model.Address;
import com.elitebuy.model.Order;
import com.elitebuy.model.User;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface OrderService {

    public Order createOrder(User user, Address shippingAddress);

    public Order createOrderWithStoredAddress(User user, Long AddressId);

    public Order findOrderById(Long orderId) throws OrderException;

    public List<Order> userOrderHistory(Long userId);

    public Order placedOrder(Long orderId) throws OrderException;

    public Order confirmedOrder(Long orderId) throws OrderException;

    public Order shippedOrder(Long orderId) throws OrderException;

    public Order deliveredOrder(Long orderId) throws OrderException;

    public Order cancledOrder(Long orderId) throws OrderException;

    public List<Order> getAllOrders();

    public void deleteOrder(Long orderId) throws OrderException;

}
