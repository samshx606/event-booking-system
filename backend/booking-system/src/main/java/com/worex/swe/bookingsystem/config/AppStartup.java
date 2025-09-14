package com.worex.swe.bookingsystem.config;
import com.worex.swe.bookingsystem.enums.Role;
import com.worex.swe.bookingsystem.model.User;
import com.worex.swe.bookingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AppStartup implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    String username = "admin";

    @Override
    public void run(String... args) throws Exception {
        if(!userRepository.existsByUsername(username)){
            User admin = new User();
            admin.setFirstName("Sameh");
            admin.setLastName("Elwan");
            admin.setUsername(username);
            admin.setEmail("saaameh.0.1@gmail.com");
            admin.setPasswordHash(passwordEncoder.encode("sameh_123@#$"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }
}
