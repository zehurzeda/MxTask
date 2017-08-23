package com.mx.cam.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonView;
import com.mx.cam.model.views.UserView;

@Entity
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;
	@JsonView(UserView.PublicView.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonView(UserView.PublicView.class)
	private String nome;		
	
	@JsonView(UserView.UsuarioAllView.class)
	private String login;
	
	@JsonView(UserView.UsuarioAllView.class)
	private String senha;
	
	@JsonView(UserView.PublicView.class)
	private String email;
	
	@JsonView(UserView.PublicView.class)
	private String imgPerfil;
	
	@JsonView(UserView.PublicView.class)
	private String imgPerfilPeq;
	
	@JsonView(UserView.UsuarioView.class)
	private boolean ativo;
	
	@JsonView(UserView.UsuarioAllView.class)
	@ManyToMany
	private List<Grupo> grupos;
	
	@JsonView(UserView.UsuarioAllView.class)
	@ManyToMany
	private List<Permissao> permissoes;
	
	@JsonView(UserView.UsuarioView.class)
	@ManyToOne
	@JoinColumn(name="equipe_id")
	private Equipe equipe;
	
	
	public String getImgPerfilPeq() {
		return imgPerfilPeq;
	}

	public void setImgPerfilPeq(String imgPerfilPeq) {
		this.imgPerfilPeq = imgPerfilPeq;
	}
	
	public Equipe getEquipe() {
		return equipe;
	}

	public void setEquipe(Equipe equipe) {
		this.equipe = equipe;
	}

	public String getImgPerfil() {
		return imgPerfil;
	}
	
	public void setImgPerfil(String imgPerfil) {
		this.imgPerfil = imgPerfil;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public boolean isAtivo() {
		return ativo;
	}
	
	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	
	public List<Grupo> getGrupos() {
		return grupos;
	}
	
	public void setGrupos(List<Grupo> grupos) {
		this.grupos = grupos;
	}
	
	public List<Permissao> getPermissoes() {
		return permissoes;
	}

	public void setPermissoes(List<Permissao> permissoes) {
		this.permissoes = permissoes;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nome=" + nome + ", login=" + login + ", email" + email + "]";
	}
}
