package com.example.vpt_be.entity;

import javax.persistence.*;

@Entity
@Table(name = "languages")
public class Language {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int languageId;
    private String language;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public int getLanguageId() {
        return languageId;
    }

    public String getLanguage() {
        return language;
    }
}
