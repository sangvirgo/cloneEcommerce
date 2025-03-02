package com.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtValidator jwtValidator) throws Exception {
        http                        //
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))    // SessionCreationPolicy.STATELESS: Không sử dụng session, phù hợp với ứng dụng REST API dùng JWT.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()         //anyRequest().permitAll(): Cho phép truy cập không cần xác thực cho các URL còn lại.
                )                                         //requestMatchers("/api/**").authenticated(): Yêu cầu xác thực cho các URL bắt đầu bằng /api/.
                .addFilterBefore(jwtValidator, BasicAuthenticationFilter.class)   // Thêm JwtValidator filter trước BasicAuthenticationFilter để xử lý xác thực token JWT trước khi xác thực HTTP Basic.
                .csrf(csrf -> csrf.disable())    //Tắt bảo vệ CSRF, phù hợp với ứng dụng REST API dùng JWT.
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  //  Kích hoạt CORS với cấu hình từ corsConfigurationSource().
                .httpBasic(httpBasic -> httpBasic.realmName("Ecommerce Application"));   //Cấu hình HTTP Basic với realmName là Ecommerce Application.

        return http.build();
    }
/*

CORS giúp frontend (React, Angular) gọi API từ backend (Spring Boot).
Cấu hình này giúp tránh lỗi CORS khi gọi API từ domain khác.
Quan trọng khi làm việc với JWT, cookies hoặc request từ frontend khác nguồn.
 */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:4200"
        ));
        cfg.setAllowedMethods(Collections.singletonList("*"));
        cfg.setAllowCredentials(true);
        cfg.setAllowedHeaders(Collections.singletonList("*"));
        cfg.setExposedHeaders(Arrays.asList("Authorization"));
        cfg.setMaxAge(3000L);
        return new UrlBasedCorsConfigurationSource() {{
            registerCorsConfiguration("/**", cfg);
        }};
    }

    /*
    CorsConfiguration cfg: Tạo cấu hình CORS.
setAllowedOrigins: Cho phép các nguồn localhost:3000, localhost:8080, localhost:4200.
setAllowedMethods: Cho phép tất cả phương thức HTTP (*).
setAllowCredentials(true): Cho phép gửi credentials (cookie, header Authorization).
setAllowedHeaders: Cho phép tất cả header.
setExposedHeaders: Cho phép client truy cập header Authorization.
setMaxAge(3000L): Cache CORS preflight request 3000 giây.
UrlBasedCorsConfigurationSource: Áp dụng cấu hình CORS cho tất cả các URL (/**).
     */

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtValidator jwtValidator(JwtConstant jwtConstant) {
        return new JwtValidator(jwtConstant);
    }


    /*
    Định nghĩa bean JwtValidator:
JwtConstant jwtConstant: Inject bean JwtConstant để truyền vào constructor của JwtValidator.
     */
}


/*
Mục đích: Đây là file cấu hình chính của Spring Security, định nghĩa các chính sách bảo mật, CORS, và cung cấp các bean như PasswordEncoder và JwtValidator.
package com.ecommerce.config: Định nghĩa package của file.
Imports: Nhập các thư viện cần thiết:
Bean, Configuration: Định nghĩa bean và cấu hình Spring.
EnableWebSecurity: Kích hoạt Spring Security.
HttpSecurity, SessionCreationPolicy, SecurityFilterChain: Cấu hình bảo mật HTTP.
BCryptPasswordEncoder, PasswordEncoder: Mã hóa mật khẩu.
BasicAuthenticationFilter: Để thêm filter tùy chỉnh (JWT).
CorsConfiguration, CorsConfigurationSource, UrlBasedCorsConfigurationSource: Cấu hình CORS.
Arrays, Collections: Để xử lý danh sách.
@Configuration: Đánh dấu đây là file cấu hình Spring.
@EnableWebSecurity: Kích hoạt Spring Security.



@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtValidator jwtValidator) throws Exception {

@Bean: Định nghĩa một bean SecurityFilterChain.
HttpSecurity http: Đối tượng để cấu hình bảo mật HTTP.
JwtValidator jwtValidator: Inject bean JwtValidator để sử dụng trong chuỗi filter.
throws Exception: Phương thức có thể ném ngoại lệ.


http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

Cấu hình quản lý session:
SessionCreationPolicy.STATELESS: Không sử dụng session, phù hợp với ứng dụng REST API dùng JWT.



 */