package com.example.vpt_be;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Properties;

public class SendEmail {


    public static void sendEmail(String email, String title, float basePrice, float currentDiscountedPrice,
                                 String currentDiscountEndDate) throws MessagingException, IOException {

        Properties prop = new Properties();

        prop.put("mail.smtp.auth",true);
        prop.put("mail.smtp.starttls.enable","true");
        prop.put("mail.smtp.host","smtp.gmail.com");
        prop.put("mail.smtp.port","25");
        prop.put("mail.smtp.ssl.trust","smtp.gmail.com");
        prop.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Session session = Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("fornasari14@gmail.com", "scfpmpsfusxhiykt");
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress("no-reply@gmail.com"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));

        message.setSubject("Videogame Price Tracker");

        String msg = "<div style='text-align: center; font-size: 20px; font-weight: 400;'>" +
                "<p style='font-size: 24px; font-weight: 600;'>" + title + "</p>" +
                "<p style='text-decoration: line-through;'>" + basePrice + "€</p>" +
                "<p style='color: green;'>" + currentDiscountedPrice + "</p>" +
                "<p>" + Math.round(100 - currentDiscountedPrice / (basePrice / 100)) + "% off</p>" +
                "<p>" + currentDiscountEndDate + "</p>" +
                "</div>";

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(msg,"text/html; charset=utf-8");

        Multipart multipart = new MimeMultipart("related");
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);

    }


}
