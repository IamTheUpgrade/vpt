package com.example.vpt_be.account.controller;

import com.example.vpt_be.account.entity.UserList;
import com.example.vpt_be.account.entity.VPT_User;
import com.example.vpt_be.account.repository.UserListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserListController {

    @Autowired
    private UserListRepository userListRepository;

    @PostMapping("/watchlist")
    public UserList addGameInWatchList(@RequestBody VPT_User vpt_user, @RequestParam int videogameId) {
        UserList userList = new UserList();
        userList.setVideogameId(videogameId);
        userList.setVpt_user(vpt_user);
        return userListRepository.save(userList);
    }

    @DeleteMapping("/watchlist")
    public void deleteGameInWatchList(@RequestBody UserList userList) {
        userListRepository.delete(userList);
    }

}
