package com.hansalchai.haul.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hansalchai.haul.user.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {

	@Query("select u from Users u where u.tel = :tel and u.role != 'GUEST'")
	Optional<Users> findUserByTel(@Param("tel") String tel);
}
