package com.example.insertData.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "videogames")
public class Videogame {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int videogameId;
    private String type;
    private String title;
    private String developer;
    private String publisher;
    private float basePrice;
    private Float discountedPrice;
    private String discountEndDate;
    private byte[] cover;
    private String description;
    private String releaseDate;
    @OneToMany(mappedBy = "videogame")
    private List<Language> languages;
    @OneToMany(mappedBy = "videogame")
    private List<Subtitle> subtitles;
    @OneToMany(mappedBy = "videogame")
    private List<Category> categories;
    @OneToMany(mappedBy = "videogame")
    private List<Content> contents;
    @OneToMany(mappedBy = "videogame")
    private List<System> systems;
    @OneToMany(mappedBy = "videogame")
    private List<GameReferenced> gameReferenced;

    public void setType(String type) {
        this.type = type;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setBasePrice(float basePrice) {
        this.basePrice = basePrice;
    }

    public void setDiscountedPrice(Float discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public void setDiscountEndDate(String discountedEndDate) {
        this.discountEndDate = discountedEndDate;
    }

    public void setCover(byte[] cover) {
        this.cover = cover;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getVideogameId() {
        return videogameId;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getDeveloper() {
        return developer;
    }

    public String getPublisher() {
        return publisher;
    }

    public float getBasePrice() {
        return basePrice;
    }

    public Float getDiscountedPrice() {
        return discountedPrice;
    }

    public String getDiscountEndDate() {
        return discountEndDate;
    }

    public byte[] getCover() {
        return cover;
    }

    public String getDescription() {
        return description;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public List<Subtitle> getSubtitles() {
        return subtitles;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public List<Content> getContents() {
        return contents;
    }

    public List<System> getSystems() {
        return systems;
    }

    public List<GameReferenced> getGameReferenced() {
        return gameReferenced;
    }

}
