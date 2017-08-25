package com.mx.cam.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonView;
import com.mx.cam.model.views.UserView;

@Entity
public class Equipe {
	
	@JsonView(UserView.PublicView.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonView(UserView.PublicView.class)
	private String nome;
	
	@JsonView(UserView.PublicView.class)
	private String descricao;
	
	@JsonView(UserView.EquipeView.class)
	@OneToMany(mappedBy="equipe", targetEntity=Usuario.class, fetch=FetchType.LAZY)
	private List<Usuario> usuarios;
	
	@JsonView(UserView.EquipeView.class)
	@OneToMany(mappedBy="equipe", targetEntity=Tarefa.class, fetch=FetchType.LAZY)
	private List<Tarefa> tarefas;
	
	

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public List<Tarefa> getTarefas() {
		return tarefas;
	}

	public void setTarefas(List<Tarefa> tarefas) {
		this.tarefas = tarefas;
	}

	
	
	
	
	
}
