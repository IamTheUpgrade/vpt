package com.example.vpt_be.repository;

import com.example.vpt_be.entity.GameReferenced;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameReferencedRepository extends JpaRepository<GameReferenced, Integer> {


}
