package com.mx.cam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cam.model.Grupo;
import com.mx.cam.model.Permissao;


public interface Permissoes extends JpaRepository<Permissao, Long> {
	
	List<Permissao> findByGruposIn(Grupo grupo);

}
