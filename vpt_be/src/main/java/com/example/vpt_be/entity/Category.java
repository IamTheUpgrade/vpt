package com.example.vpt_be.entity;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int categoryId;
    private String category;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;

    public void setCategory(String category) {
        this.category = category;
    }

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getCategory() {
        return category;
    }
}
