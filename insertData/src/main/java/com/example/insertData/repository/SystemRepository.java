package com.example.insertData.repository;

import com.example.insertData.entity.System;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemRepository extends JpaRepository<System, Integer> {
}
