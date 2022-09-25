package com.example.insertData;

import com.example.insertData.entity.*;
import com.example.insertData.entity.System;
import com.example.insertData.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;

@Component
public class DataBaseLoader implements CommandLineRunner {

    @Autowired
    private VideogameRepository videogameRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private SubtitleRepository subtitleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SystemRepository systemRepository;

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private GameReferencedRepository gameReferencedRepository;

    @Override
    public void run(String... args) throws Exception {

        if (!videogameRepository.findAll().isEmpty()) return;

        ReadFile file = new ReadFile("videogames.txt");

        for (String videogameString: file.getStr()) {

            String[] videogameAttributes = videogameString.split("--");

            Videogame videogame = new Videogame();
            videogame.setType(videogameAttributes[0]);
            videogame.setTitle(videogameAttributes[1]);
            videogame.setDeveloper(videogameAttributes[2]);
            videogame.setPublisher(videogameAttributes[3]);
            videogame.setBasePrice(Float.parseFloat(videogameAttributes[4]));
            videogame.setDiscountedPrice(null);

            if (!videogameAttributes[5].equals("null")) {
                File imgPath = new File(videogameAttributes[5]);
                byte[] img = Files.readAllBytes(imgPath.toPath());
                videogame.setCover(img);
            }

            videogame.setDescription(videogameAttributes[6]);
            videogame.setReleaseDate(videogameAttributes[7]);

            Videogame currentvideogame = videogameRepository.save(videogame);

            if (!videogameAttributes[8].equals("null")) {
                for (String currentLanguage: videogameAttributes[8].split(",")) {
                    Language language = new Language();
                    language.setVideogame(currentvideogame);
                    language.setLanguage(currentLanguage);
                    languageRepository.save(language);
                }
            }

            if (!videogameAttributes[9].equals("null")) {
                for (String currentSubtitle: videogameAttributes[9].split(",")) {
                    Subtitle subtitle = new Subtitle();
                    subtitle.setVideogame(currentvideogame);
                    subtitle.setSubtitle(currentSubtitle);
                    subtitleRepository.save(subtitle);
                }
            }

            if (!videogameAttributes[10].equals("null")) {
                for (String currentCategory: videogameAttributes[10].split(",")) {
                    Category category = new Category();
                    category.setVideogame(currentvideogame);
                    category.setCategory(currentCategory);
                    categoryRepository.save(category);
                }
            }

            for (String currentSystem: videogameAttributes[11].split(",")) {
                System system = new System();
                system.setVideogame(currentvideogame);
                system.setSystem(currentSystem);
                systemRepository.save(system);
            }

            for (String currentContent: videogameAttributes[12].split(",")) {
                Content content = new Content();
                content.setVideogame(currentvideogame);
                content.setContent(currentContent);
                contentRepository.save(content);
            }

        }

        ReadFile allReferences = new ReadFile("references.txt");

        for (String referenceString: allReferences.getStr()) {

            String[] titleAndReferences = referenceString.split("=");
            String title = titleAndReferences[0];
            String[] references = titleAndReferences[1].split(",");

            Videogame currentVideogame = videogameRepository.getVideogameByTitle(title);

            for (String currentReference: references) {
                GameReferenced gameReferenced = new GameReferenced();
                gameReferenced.setVideogame(currentVideogame);
                gameReferenced.setReference(videogameRepository.getVideogameByTitle(currentReference).getVideogameId());
                gameReferencedRepository.save(gameReferenced);
            }

        }

    }

}