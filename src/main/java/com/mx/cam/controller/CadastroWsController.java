package com.mx.cam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.mx.cam.model.Equipe;
import com.mx.cam.model.Usuario;
import com.mx.cam.model.views.UserView;
import com.mx.cam.repository.Equipes;
import com.mx.cam.repository.Usuarios;

/**
 * Classe controller responsável pelas requisições no webService
 * de cadastro
 * 
 * @author zehurzeda
 * @since 21/08/2017
 * @version 0.1
 */
@RestController
@RequestMapping("/ws")
public class CadastroWsController {
	
	@Autowired
	private Equipes eqpRepository;
	
	@Autowired
	private Usuarios usrRepository;
	
	
	@JsonView(UserView.PublicView.class)
	@GetMapping("/equipe")
	public List<Equipe> findAllEquipe(){
		return eqpRepository.findAll();
	}
	
	
	@JsonView(UserView.EquipeView.class)
	@GetMapping("/equipe/{equipeId}")
	public Equipe findOneEquipe(@PathVariable(value="equipeId")Long id) {
		return eqpRepository.findOne(id);
	}
	
	@RequestMapping(value="/equipe", method=RequestMethod.POST)
	public ResponseEntity<Equipe> saveEquipe(@RequestBody Equipe equipe){
		Equipe eqpCriada = eqpRepository.save(equipe);
		return new ResponseEntity<>(eqpCriada, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/equipe", method=RequestMethod.PUT)
	public @ResponseBody ResponseEntity<?> AtualizaEquipe(@RequestBody Equipe equipe) {
		Equipe eqp = eqpRepository.findOne(equipe.getId());
		if(eqp == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		eqpRepository.save(equipe);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value="/equipe/{equipeId}", method=RequestMethod.DELETE)
	public @ResponseBody ResponseEntity<?> DeleteEquipe(@PathVariable(value="equipeId") Long id) {
		Equipe equipe = eqpRepository.findOne(id);
		
		if(equipe == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		try {
			eqpRepository.delete(equipe);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	

	
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
