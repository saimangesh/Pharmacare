package edu.pharmacare;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edu.pharmacare.service.HomeService;

@SpringBootApplication
public class PharmaCareApplication implements CommandLineRunner {

	@Autowired
	private HomeService homeService;
	
	@Value("${allowed.orgins}")
	private String allowedOrigins;

	public static void main(String[] args) {
		SpringApplication.run(PharmaCareApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins(allowedOrigins);
			}
		};
	}

	@Override
	public void run(String... args) {
//		homeService.loadPharmacyData();
//		homeService.loadNutritionData();
	}

}
