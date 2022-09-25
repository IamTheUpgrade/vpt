package com.example.insertData.controller;

import com.example.insertData.entity.Videogame;
import com.example.insertData.repository.VideogameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class VideogameController {

    @Autowired
    private VideogameRepository videogameRepository;

    @GetMapping("/videogames/essentialInformation")
    public List<Object[]> getEssentialInformation() {
        return videogameRepository.getEssentialInformation();
    }

    @GetMapping("videogame/{title}")
    public Videogame getVideogameByTitle(@PathVariable String title) {
        return videogameRepository.getVideogameByTitle(title);
    }

    @GetMapping("videogame")
    public Videogame getVideogameById(@RequestParam int id) {
        return videogameRepository.findById(id).get();
    }

}
