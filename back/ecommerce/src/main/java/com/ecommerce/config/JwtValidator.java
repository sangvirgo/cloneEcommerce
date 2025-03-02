package com.ecommerce.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

//Mục đích: Filter để xác thực token JWT trong mỗi yêu cầu HTTP.


//extends OncePerRequestFilter: Đảm bảo filter chỉ được gọi một lần cho mỗi yêu cầu.
public class JwtValidator extends OncePerRequestFilter {

    private final SecretKey key;

    public JwtValidator(JwtConstant jwtConstant) {
        this.key = Keys.hmacShaKeyFor(jwtConstant.getSecretKey().getBytes(StandardCharsets.UTF_8));
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//        getHeader(JwtConstant.JWT_HEADER): Lấy token từ header Authorization.
        String jwt=request.getHeader(JwtConstant.JWT_HEADER);

//        startsWith("Bearer "): Kiểm tra token có prefix "Bearer ".
        if(jwt!=null && jwt.startsWith("Bearer ")) {
            try {
                jwt=jwt.substring(7);

//                Parse token: Xác thực token và lấy email, authorities.
                Claims claims=Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();

                String email=String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

//                AuthorityUtils.commaSeparatedStringToAuthorityList: Chuyển chuỗi authorities thành danh sách GrantedAuthority.
                List<GrantedAuthority> auths= AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

//                Tạo đối tượng Authentication và set vào SecurityContextHolder.
                Authentication authentication=new UsernamePasswordAuthenticationToken(email, null, auths);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token: "+ e.getMessage());
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

}
