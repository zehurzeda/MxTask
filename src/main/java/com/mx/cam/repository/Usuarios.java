package com.mx.cam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cam.model.Usuario;


public interface Usuarios extends JpaRepository<Usuario, Long> {

	Usuario findByLogin(String login);
}	
