package io.github.skrap.modeling;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/conf/spring/*.xml"})
public class AvscTest {


    @Autowired
    ApplicationContext applicationContext;


    @Test
    public void test1(){
        AvscLoader avscLoader = new AvscLoader();

        try {
            avscLoader.test4(applicationContext);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
