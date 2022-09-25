package com.example.insertData.entity;

import javax.persistence.*;

@Entity
@Table(name = "contents")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contentId;
    private String content;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;

    public void setContent(String content) {
        this.content = content;
    }

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public int getContentId() {
        return contentId;
    }

    public String getContent() {
        return content;
    }
}
