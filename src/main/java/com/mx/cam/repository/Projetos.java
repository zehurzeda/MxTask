package com.mx.cam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cam.model.Projeto;


public interface Projetos extends JpaRepository<Projeto, Long> {

	public List<Projeto> findAllByStatus(Character pStatus);
	
}
