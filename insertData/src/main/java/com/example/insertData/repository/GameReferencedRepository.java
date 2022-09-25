package com.example.insertData.repository;

import com.example.insertData.entity.GameReferenced;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameReferencedRepository extends JpaRepository<GameReferenced, Integer> {


}
