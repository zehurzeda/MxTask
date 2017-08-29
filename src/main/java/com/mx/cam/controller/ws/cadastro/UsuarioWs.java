package com.mx.cam.controller.ws.cadastro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.mx.cam.model.Usuario;
import com.mx.cam.model.views.UserView;
import com.mx.cam.repository.Usuarios;

@RestController
@RequestMapping("/ws")
public class UsuarioWs {
	
	@Autowired
	private Usuarios usrRepository;
	
	@JsonView(UserView.UsuarioView.class)
	@GetMapping("/usuario")
	public List<Usuario> findAllUsuario(){
		return usrRepository.findAll();
	}
	
	@JsonView(UserView.UsuarioView.class)
	@GetMapping("/usuario/{userId}")
	public Usuario findOneUsuario(@PathVariable(value="userId")Long id){
		return usrRepository.findOne(id);
	}
}
