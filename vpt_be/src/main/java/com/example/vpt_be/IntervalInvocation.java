package com.example.vpt_be;

import java.util.Timer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class IntervalInvocation implements CommandLineRunner {

    @Autowired
    private TaskInvocation taskInvocation;

    @Override
    public void run(String... args) {

        new Timer().scheduleAtFixedRate(taskInvocation, 0L, 86400000L);

    }
}
