package com.example.vpt_be.entity;

import javax.persistence.*;

@Entity
@Table(name = "systems")
public class System {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int systemId;
    private String system;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;

    public void setSystem(String system) {
        this.system = system;
    }

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public int getSystemId() {
        return systemId;
    }

    public String getSystem() {
        return system;
    }
}
