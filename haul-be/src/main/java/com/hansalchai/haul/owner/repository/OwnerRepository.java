package com.hansalchai.haul.owner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.owner.entity.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

}
