package com.example.vpt_be.repository;

import com.example.vpt_be.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("SELECT DISTINCT(c.category) FROM Category AS c")
    List<String> getAllDistinctCategories();

}
