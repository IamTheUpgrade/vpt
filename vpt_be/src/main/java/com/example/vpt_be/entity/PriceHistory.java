package com.example.vpt_be.entity;

import javax.persistence.*;

@Entity
@Table(name = "prices_history")
public class PriceHistory {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int priceId;
    private float price;
    private String startDate;
    private String endDate;
    @ManyToOne
    @JoinColumn(name = "videogame_id")
    private Videogame videogame;

    public void setPrice(float price) {
        this.price = price;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setVideogame(Videogame videogame) {
        this.videogame = videogame;
    }

    public int getPriceId() {
        return priceId;
    }

    public float getPrice() {
        return price;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }
}
