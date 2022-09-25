package com.example.vpt_be.repository;

import com.example.vpt_be.entity.System;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemRepository extends JpaRepository<System, Integer> {

    @Query("SELECT DISTINCT(s.system) FROM System AS s")
    List<String> getAllDistinctSystems();

}
