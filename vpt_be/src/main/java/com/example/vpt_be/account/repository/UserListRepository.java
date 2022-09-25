package com.example.vpt_be.account.repository;

import com.example.vpt_be.account.entity.UserList;
import com.example.vpt_be.account.entity.VPT_User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserListRepository extends JpaRepository<UserList, Integer> {

    @Query("SELECT u.vpt_user FROM UserList AS u WHERE u.videogameId = ?1")
    List<VPT_User> findAllUsersWithVideogameInWatchList(int videogameId);

}
