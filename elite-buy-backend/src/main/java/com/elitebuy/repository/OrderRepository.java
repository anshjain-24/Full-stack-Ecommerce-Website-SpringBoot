package com.elitebuy.repository;

import com.elitebuy.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query("SELECT o FROM ORDER o WHERE o.user.id=:userId AND (o.orderStatus = PLACED OR (o.orderStatus = CONFIRMED OR o.orderStatus=SHIPPED OR o.orderStatus = DELIVERED)")
    public List<Order> getUserOrders(@Param("userId") Long userId);

}
