package com.example.insertData.entity;

import javax.persistence.*;

@Entity
@Table(name = "subtitles")
public class Subtitle {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int subtitleId;
    private String subtitle;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public int getSubtitleId() {
        return subtitleId;
    }

    public String getSubtitle() {
        return subtitle;
    }
}
