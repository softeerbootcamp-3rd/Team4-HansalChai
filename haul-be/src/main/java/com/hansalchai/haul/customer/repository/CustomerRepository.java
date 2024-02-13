package com.hansalchai.haul.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
