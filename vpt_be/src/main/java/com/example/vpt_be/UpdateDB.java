package com.example.vpt_be;

import com.example.vpt_be.account.entity.VPT_User;
import com.example.vpt_be.account.repository.UserListRepository;
import com.example.vpt_be.entity.*;
import com.example.vpt_be.entity.System;
import com.example.vpt_be.repository.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.*;

@Component
public class UpdateDB {

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

    @Autowired
    private PriceHistoryRepository priceHistoryRepository;

    @Autowired
    private UserListRepository userListRepository;

    public void task() {

        String essentialInformation = getJSON("videogames/essentialInformation");

        JSONParser parser = new JSONParser();

        JSONArray videogamesList;
        try {
            videogamesList = (JSONArray) parser.parse(essentialInformation);
        } catch (org.json.simple.parser.ParseException e) {
            throw new RuntimeException("it is not possible to parse essentialInformation");
        }

        for (Object currentVideogame: videogamesList) {

            JSONArray videogameData = (JSONArray) currentVideogame;

            String title = (String) videogameData.get(0);

            Optional<Videogame> videogame = videogameRepository.findVideogameByTitle(title);

            if (videogame.isPresent()) {

                Videogame v = videogame.get();

                float basePrice = ((Double) videogameData.get(1)).floatValue();

                Float discountedPrice = (videogameData.get(2) == null) ? null :
                        Float.valueOf(videogameData.get(2).toString());

                if (v.getBasePrice() != basePrice) videogameRepository.updateBasePrice(basePrice, title);

                if (discountedPrice == null) {

                    if (v.getCurrentDiscountedPrice() != null) {
                        videogameRepository.updateCurrentDiscountedPrice(null, title);
                        videogameRepository.updateCurrentDiscountEndDate(null, title);
                    }

                } else {

                    if (!discountedPrice.equals(v.getCurrentDiscountedPrice())) {
                        videogameRepository.updateCurrentDiscountedPrice(discountedPrice, title);
                        videogameRepository.updateCurrentDiscountEndDate((String) videogameData.get(3), title);

                        PriceHistory priceHistory = new PriceHistory();
                        priceHistory.setPrice(discountedPrice);
                        priceHistory.setStartDate(String.valueOf(LocalDate.now()));
                        priceHistory.setEndDate((String) videogameData.get(3));
                        priceHistory.setVideogame(v);
                        priceHistoryRepository.save(priceHistory);

                        Float currentLowestPrice = v.getLowestPrice();
                        if (currentLowestPrice == null)
                            videogameRepository.updateLowestPrice(discountedPrice, title);
                        else if (discountedPrice < currentLowestPrice)
                            videogameRepository.updateLowestPrice(discountedPrice, title);

                        List<VPT_User> users = userListRepository.findAllUsersWithVideogameInWatchList(v.getVideogameId());

                        for (VPT_User user: users) {
                            try {
                                SendEmail.sendEmail(user.getEmail(), v.getTitle(), v.getBasePrice(),
                                        discountedPrice,(String) videogameData.get(3));
                            } catch (MessagingException | IOException e) {
                                e.printStackTrace();
                            }
                        }

                    }

                }

            } else {

                title = "videogame/" + title.replaceAll(" ", "%20");

                String payloadVideogame = getJSON(title);

                JSONObject jsonData;

                try {
                    jsonData = (JSONObject) parser.parse(payloadVideogame);
                } catch (org.json.simple.parser.ParseException e) {
                    throw new RuntimeException("it is not possible to parse essentialInformation");
                }

                Videogame newVideogame = createAndInsertVideogame(jsonData);
                createAndInsertLanguages(jsonData, newVideogame);
                createAndInsertSubtitles(jsonData, newVideogame);
                createAndInsertCategories(jsonData, newVideogame);
                createAndInsertContents(jsonData, newVideogame);
                createAndInsertSystems(jsonData, newVideogame);
                try {
                    createAndInsertReferences(jsonData, newVideogame);
                } catch (org.json.simple.parser.ParseException e) {
                    throw new RuntimeException("it is not possible to parse the payload");
                }

            }

        }

         if (priceHistoryRepository.findAll().isEmpty()) {

             ReadFile priceHistoryFile = new ReadFile("price-history.txt");

             for (String currentHistory: priceHistoryFile.getStr()) {

                 String[] currentHistoryColumns = currentHistory.split("--");

                 PriceHistory priceHistory = new PriceHistory();
                 priceHistory.setVideogame(videogameRepository.getVideogameByTitle(currentHistoryColumns[0]));
                 priceHistory.setPrice(Float.parseFloat(currentHistoryColumns[1]));
                 priceHistory.setStartDate(currentHistoryColumns[2]);
                 priceHistory.setEndDate(currentHistoryColumns[3]);

                 priceHistoryRepository.save(priceHistory);

             }

         }

    }

    private static String getJSON(String query) {

        try {

            URL url = new URL("http://localhost:8080/" + query);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();

            int responsecode = conn.getResponseCode();

            if (responsecode != 200) {
                throw new RuntimeException("HttpResponseCode: " + responsecode);
            } else {

                String payload = "";
                Scanner scanner = new Scanner(url.openStream());

                while (scanner.hasNext()) {
                    payload += scanner.nextLine();
                }
                scanner.close();

                return payload;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    private Videogame createAndInsertVideogame(JSONObject jsonData) {

        Videogame videogame = new Videogame();
        videogame.setType((String) jsonData.get("type"));
        videogame.setTitle((String) jsonData.get("title"));
        videogame.setDeveloper((String) jsonData.get("developer"));
        videogame.setPublisher((String) jsonData.get("publisher"));
        videogame.setBasePrice(((Double) jsonData.get("basePrice")).floatValue());
        if (jsonData.get("discountedPrice") != null) {
            videogame.setCurrentDiscountedPrice(((Double) jsonData.get("discountedPrice")).floatValue());
            videogame.setCurrentDiscountEndDate((String) jsonData.get("discountEndDate"));
            videogame.setLowestPrice(((Double) jsonData.get("discountedPrice")).floatValue());
        }
        if (jsonData.get("cover") != null) {
            String coverString = ((String) jsonData.get("cover"));
            byte[] cover = Base64.getDecoder().decode(coverString);
            videogame.setCover(cover);
        }
        if (jsonData.get("description") != null)
            videogame.setDescription((String) jsonData.get("description"));
        videogame.setReleaseDate((String) jsonData.get("releaseDate"));

        return videogameRepository.save(videogame);

    }

    private void createAndInsertLanguages(JSONObject jsonData, Videogame videogame) {

        JSONArray languages = (JSONArray) jsonData.get("languages");
        if (!languages.isEmpty()) {
            for (Object subObj: languages) {
                JSONObject jsonLangObj = (JSONObject) subObj;
                Language language = new Language();
                language.setVideogame(videogame);
                language.setLanguage((String) jsonLangObj.get("language"));
                languageRepository.save(language);
            }
        }

    }

    private void createAndInsertSubtitles(JSONObject jsonData, Videogame videogame) {

        JSONArray subtitles = (JSONArray) jsonData.get("subtitles");
        if (!subtitles.isEmpty()) {
            for (Object subObj: subtitles) {
                JSONObject jsonSubObj = (JSONObject) subObj;
                Subtitle subtitle = new Subtitle();
                subtitle.setVideogame(videogame);
                subtitle.setSubtitle((String) jsonSubObj.get("subtitle"));
                subtitleRepository.save(subtitle);
            }
        }

    }

    private void createAndInsertCategories(JSONObject jsonData, Videogame videogame) {

        JSONArray categories = (JSONArray) jsonData.get("categories");
        if (!categories.isEmpty()) {
            for (Object catObj: categories) {
                JSONObject jsonCatObj = (JSONObject) catObj;
                Category category = new Category();
                category.setVideogame(videogame);
                category.setCategory((String) jsonCatObj.get("category"));
                categoryRepository.save(category);
            }
        }

    }

    private void createAndInsertContents(JSONObject jsonData, Videogame videogame) {

        JSONArray contents = (JSONArray) jsonData.get("contents");
        if (!contents.isEmpty()) {
            for (Object conObj: contents) {
                JSONObject jsonConObj = (JSONObject) conObj;
                Content content = new Content();
                content.setVideogame(videogame);
                content.setContent((String) jsonConObj.get("content"));
                contentRepository.save(content);
            }
        }

    }

    private void createAndInsertSystems(JSONObject jsonData, Videogame videogame) {

        JSONArray systems = (JSONArray) jsonData.get("systems");
        if (!systems.isEmpty()) {
            for (Object systObj: systems) {
                JSONObject jsonSystObj = (JSONObject) systObj;
                System system = new System();
                system.setVideogame(videogame);
                system.setSystem((String) jsonSystObj.get("system"));
                systemRepository.save(system);
            }
        }

    }

    private void createAndInsertReferences(JSONObject jsonData, Videogame videogame)
            throws org.json.simple.parser.ParseException {

        JSONParser parser = new JSONParser();

        JSONArray references = (JSONArray) jsonData.get("gameReferenced");
        if (!references.isEmpty()) {
            for (Object refObj : references) {
                JSONObject jsonRefObj = (JSONObject) refObj;

                String payloadVideogame = getJSON("videogame?id=" + jsonRefObj.get("reference"));

                JSONObject jsonReference = (JSONObject) parser.parse(payloadVideogame);

                String referenceTitle = (String) jsonReference.get("title");

                Optional<Videogame> possibleVideogame = videogameRepository.findVideogameByTitle(referenceTitle);

                if (possibleVideogame.isPresent()) {

                    int refVidId = possibleVideogame.get().getVideogameId();
                    GameReferenced gameReferenced = new GameReferenced();
                    gameReferenced.setVideogame(videogame);
                    gameReferenced.setReference(refVidId);
                    gameReferencedRepository.save(gameReferenced);

                    GameReferenced oppositeReference = new GameReferenced();
                    oppositeReference.setVideogame(possibleVideogame.get());
                    oppositeReference.setReference(videogame.getVideogameId());
                    gameReferencedRepository.save(oppositeReference);

                }

            }
        }

    }

}
