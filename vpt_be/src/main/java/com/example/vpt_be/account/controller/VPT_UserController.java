package com.example.vpt_be.account.controller;

import com.example.vpt_be.account.entity.VPT_User;
import com.example.vpt_be.account.repository.VPT_UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class VPT_UserController {

    @Autowired
    private VPT_UserRepository vpt_userRepository;

    @PostMapping("/user")
    public Optional<VPT_User> insertUser(@RequestBody VPT_User vpt_user) {

        List<VPT_User> usersList = vpt_userRepository.findAll();

        for (VPT_User currentUser: usersList) {
            if (currentUser.getEmail().equals(vpt_user.getEmail())) return Optional.empty();
        }

        return Optional.of(vpt_userRepository.save(vpt_user));

    }

    @GetMapping("/user")
    public Optional<VPT_User> findUser(@RequestParam String email, @RequestParam String password) {
        return vpt_userRepository.findMatchedUser(email, password);
    }

}
