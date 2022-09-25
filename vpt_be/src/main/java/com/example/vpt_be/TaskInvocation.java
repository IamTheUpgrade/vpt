package com.example.vpt_be;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.TimerTask;

@Component
public class TaskInvocation extends TimerTask {

    @Autowired
    private UpdateDB updateDB;

    @Override
    public void run() {
        updateDB.task();
    }

}
