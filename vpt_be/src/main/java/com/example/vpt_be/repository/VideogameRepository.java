package com.example.vpt_be.repository;

import com.example.vpt_be.entity.Videogame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideogameRepository extends JpaRepository<Videogame, Integer>, JpaSpecificationExecutor<Videogame> {

    @Query("SELECT v FROM Videogame AS v WHERE title = ?1")
    Optional<Videogame> findVideogameByTitle(String title);

    @Query("SELECT v FROM Videogame AS v WHERE title = ?1")
    Videogame getVideogameByTitle(String title);

    @Transactional
    @Modifying
    @Query("UPDATE Videogame AS v SET v.basePrice = ?1 WHERE v.title = ?2")
    void updateBasePrice(float basPrice, String title);

    @Transactional
    @Modifying
    @Query("UPDATE Videogame AS v SET v.currentDiscountedPrice = ?1 WHERE v.title = ?2")
    void updateCurrentDiscountedPrice(Float currentBasePrice, String title);

    @Transactional
    @Modifying
    @Query("UPDATE Videogame AS v SET v.currentDiscountEndDate = ?1 WHERE v.title = ?2")
    void updateCurrentDiscountEndDate(String currentDiscountEndDate, String title);

    @Transactional
    @Modifying
    @Query("UPDATE Videogame AS v SET v.lowestPrice = ?1 WHERE v.title = ?2")
    void updateLowestPrice(Float lowestPrice, String title);

    @Query("SELECT DISTINCT(v.type) FROM Videogame AS v")
    List<String> getAllDistinctTypes();

}
