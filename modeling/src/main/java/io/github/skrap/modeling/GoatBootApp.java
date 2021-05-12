package io.github.skrap.modeling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

@SpringBootApplication
@ComponentScan(basePackages = {"io.github"})
@EnableSwagger2WebMvc
public class GoatBootApp {
	public static void main(String[] args) {
		SpringApplication.run(GoatBootApp.class, args);
	}

	@Bean
	public Docket api() {

		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("io.github.goat"))
				.paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo(){
		return new ApiInfoBuilder()
				.title("DACP API")
				.description("DACP API DEMO")
				.termsOfServiceUrl("http://localhost:8080/")
				//.contact(new Contact("liukun","","liukun@asiainfo.com"))
				.version("1.0")
				.build();
	}
}