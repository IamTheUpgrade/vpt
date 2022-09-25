package com.example.vpt_be.controller;

import com.example.vpt_be.repository.SystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class SystemController {

    @Autowired
    private SystemRepository systemRepository;

    @GetMapping("/systems")
    public List<String> getAllDistinctSystems() {
        return systemRepository.getAllDistinctSystems();
    }

}
