package com.example.insertData;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class ReadFile {

    private ArrayList<String> strs = new ArrayList<>();

    public ReadFile(String file) {

        try {
            Scanner scanner = new Scanner(new File(file));
            scanner.useDelimiter("---");
            while (scanner.hasNext()) {
                strs.add(scanner.next().trim());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public ArrayList<String> getStr() {
        return strs;
    }

}