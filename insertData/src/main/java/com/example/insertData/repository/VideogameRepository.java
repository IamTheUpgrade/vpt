package com.example.insertData.repository;

import com.example.insertData.entity.Videogame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideogameRepository extends JpaRepository<Videogame, Integer> {

    @Query("SELECT v FROM Videogame AS v WHERE title = ?1")
    Videogame getVideogameByTitle(String title);

    @Query("SELECT v.title, v.basePrice, v.discountedPrice, v.discountEndDate FROM Videogame AS v")
    List<Object[]> getEssentialInformation();

}
