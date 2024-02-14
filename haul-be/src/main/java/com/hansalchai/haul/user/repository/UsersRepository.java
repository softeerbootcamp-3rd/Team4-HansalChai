package com.hansalchai.haul.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.user.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {

	Optional<Users> findByTel(String tel);
}
