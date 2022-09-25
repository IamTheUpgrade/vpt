package com.example.vpt_be.account.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "vpt_users")
public class VPT_User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userId;
    private String email;
    private String password;
    @OneToMany(mappedBy = "vpt_user")
    private List<UserList> userList;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public List<UserList> getUserList() {
        return userList;
    }

}
