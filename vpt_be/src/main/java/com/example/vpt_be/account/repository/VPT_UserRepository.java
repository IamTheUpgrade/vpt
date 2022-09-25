package com.example.vpt_be.account.repository;

import com.example.vpt_be.account.entity.VPT_User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VPT_UserRepository extends JpaRepository<VPT_User, Integer> {

    @Query("SELECT u FROM VPT_User AS u WHERE email = ?1 AND password = ?2")
    Optional<VPT_User> findMatchedUser(String email, String password);

}
