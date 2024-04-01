package com.elitebuy.service;

import com.elitebuy.model.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    public List<Address> findAddressById(Long userId);
}
