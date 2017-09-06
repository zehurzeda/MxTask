package com.mx.cam.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.mx.cam.model.views.UserView;

@Entity
public class Projeto implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonView(UserView.PublicView.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	
	@JsonView(UserView.PublicView.class)
	private String nome;
	
	@JsonView(UserView.PublicView.class)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime dataAbertura;
	
	@JsonView(UserView.PublicView.class)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime dataFechamento;
	
	//0 = aberto, 1 = fechado
	@JsonView(UserView.PublicView.class)
	private Character status;
	
	@JsonView(UserView.PublicView.class)
	@Column(columnDefinition = "Text")
	private String descricao;
	
	@OneToMany(mappedBy = "projeto", targetEntity = Tarefa.class, fetch = FetchType.LAZY)
	private List<Tarefa> tarefas;
	
	@JsonView(UserView.ProjetoView.class)
	@ManyToOne
	@JoinColumn(name = "equipe_id")
	private Equipe equipe;
	
	
	public Character getStatus() {
		return status;
	}

	public void setStatus(Character status) {
		this.status = status;
	}

	public List<Tarefa> getTarefas() {
		return tarefas;
	}

	public void setTarefas(List<Tarefa> tarefas) {
		this.tarefas = tarefas;
	}

	public Equipe getEquipe() {
		return equipe;
	}

	public void setEquipe(Equipe equipe) {
		this.equipe = equipe;
	}

	public LocalDateTime getDataFechamento() {
		return dataFechamento;
	}

	public void setDataFechamento(LocalDateTime dataFechamento) {
		this.dataFechamento = dataFechamento;
	}
	
	public LocalDateTime getDataAbertura() {
		return dataAbertura;
	}

	public void setDataAbertura(LocalDateTime dataAbertura) {
		this.dataAbertura = dataAbertura;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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

}
