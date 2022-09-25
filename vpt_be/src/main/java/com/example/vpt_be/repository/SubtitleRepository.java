package com.example.vpt_be.repository;

import com.example.vpt_be.entity.Subtitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubtitleRepository extends JpaRepository<Subtitle, Integer> {


}
