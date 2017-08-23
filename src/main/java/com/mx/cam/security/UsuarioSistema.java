package com.mx.cam.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class UsuarioSistema extends User {

	private static final long serialVersionUID = 1L;
	
	private String id;
	private String nome;
	private String email;
	private String imgPerfil;
	
	public UsuarioSistema(Long id, String nome, String username, String password, String email, String imgPerfil, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.id = id.toString();
		this.email = email;
		this.nome = nome;
		this.imgPerfil = imgPerfil;
	}
	
	public String getId() {
		return id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getImgPerfil() {
		return imgPerfil;
	}
}