package com.example.insertData.repository;

import com.example.insertData.entity.Subtitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubtitleRepository extends JpaRepository<Subtitle, Integer> {

}
