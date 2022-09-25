package com.example.insertData.entity;

import javax.persistence.*;

@Entity
@Table(name = "game_referenced")
public class GameReferenced {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int referenceId;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;
    private int reference;

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public void setReference(int reference) {
        this.reference = reference;
    }

    public int getReferenceId() {
        return referenceId;
    }

    public int getReference() {
        return reference;
    }

}
