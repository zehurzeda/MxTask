package com.mx.cam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cam.model.Mensagem;

public interface Mensagens extends JpaRepository<Mensagem, Long> {

}
