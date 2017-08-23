package com.mx.cam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cam.model.Grupo;
import com.mx.cam.model.Usuario;


public interface Grupos extends JpaRepository<Grupo, Long> {
	
	List<Grupo> findByUsuariosIn(Usuario usuario);

}
