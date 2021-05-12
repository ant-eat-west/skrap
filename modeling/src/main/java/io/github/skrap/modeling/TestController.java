package io.github.skrap.modeling;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String sayHelloWorld() {
        return ("Hello World1");
    }

    @GetMapping("/q")
    public String q() {
        return ("Hello World1");
    }
}
