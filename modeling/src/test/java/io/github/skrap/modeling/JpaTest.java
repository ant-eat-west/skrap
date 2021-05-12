package io.github.skrap.modeling;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/conf/spring/*.xml"})
public class JpaTest {


    @Autowired
    JpaRepositoryImplementation userRepo;


    @Test
    public void test1(){

//        User po = new User("1","abc");
//
//        testRepo.save(po);


        Assert.assertEquals("1",(userRepo.findById("1").get()));
    }

}
