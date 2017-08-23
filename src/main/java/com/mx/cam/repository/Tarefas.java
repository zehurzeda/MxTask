package com.mx.cam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cam.model.Tarefa;

public interface Tarefas extends JpaRepository<Tarefa, Long>{
	
}
