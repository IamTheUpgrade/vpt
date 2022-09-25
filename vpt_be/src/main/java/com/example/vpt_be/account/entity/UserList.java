package com.example.vpt_be.account.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_list")
public class UserList {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userListId;
    private int videogameId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private VPT_User vpt_user;

    public void setVideogameId(int videogameId) {
        this.videogameId = videogameId;
    }

    public void setVpt_user(VPT_User vpt_user) {
        this.vpt_user = vpt_user;
    }

    public int getUserListId() {
        return userListId;
    }

    public int getVideogameId() {
        return videogameId;
    }

}
