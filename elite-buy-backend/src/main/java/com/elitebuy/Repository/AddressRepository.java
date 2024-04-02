package com.elitebuy.Repository;

import com.elitebuy.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Long> {

    List<Address> findByUserId(Long userId);

    @Query("SELECT a FROM Address a WHERE a.id = :id")
    Address findAddressById(@Param("id") Long id);

}
