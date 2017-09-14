package com.mx.cam.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mx.cam.security.UserDetailsServiceImpl;

@EnableWebSecurity
public class SecurityWebConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private UserDetailsServiceImpl userDetailServiceImpl; 
	
	@Override
	protected void configure(HttpSecurity http) throws Exception{
		http
			.authorizeRequests()
				.antMatchers("/resources/**", "/webjars/**", "/ws/**", "/node_modules/**").permitAll()
				.anyRequest().authenticated()
			.and()
			.formLogin()
				.loginPage("/login")
				.permitAll()
				.defaultSuccessUrl("/")
			.and()
			.logout()
				.permitAll()
			.and()
			.rememberMe()
			.and()
				.csrf().disable();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder builder) throws Exception{
		builder
			.userDetailsService(userDetailServiceImpl)
			.passwordEncoder(new BCryptPasswordEncoder());
	}
}
