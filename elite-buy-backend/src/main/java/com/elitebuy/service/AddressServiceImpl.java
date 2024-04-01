package com.elitebuy.service;

import com.elitebuy.Repository.AddressRepository;
import com.elitebuy.model.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressRepository addressRepository;
    @Override
    public List<Address> findAddressById(Long userId){
        return addressRepository.findByUserId(userId);
    }
}
