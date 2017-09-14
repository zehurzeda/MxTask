package com.mx.cam.controller.ws.cadastro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.mx.cam.model.Equipe;
import com.mx.cam.model.views.UserView;
import com.mx.cam.repository.Equipes;

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
public class EquipeWs {
	
	@Autowired
	private Equipes eqpRepository;
	
	/**
	 * Função que retorna por requisição get Todas as equipes cadastradas no banco
	 * url: /ws/equipe
	 * @return Lista<Equipe> populada com todas as equipes
	 */
	@JsonView(UserView.PublicView.class)
	@RequestMapping(value="/equipe", method=RequestMethod.GET)
	public List<Equipe> findAllEquipe(){
		return eqpRepository.findAll();
	}
	
	/**
	 * Função que retorna por requisição get a equipe solicitada por parametro na url
	 * @param id da url /ws/equipe/id
	 * @return
	 */
	@JsonView(UserView.EquipeAllView.class)
	@RequestMapping(value="/equipe/{equipeId}", method=RequestMethod.GET)
	public Equipe findOneEquipe(@PathVariable(value="equipeId")Long id) {
		return eqpRepository.findOne(id);
	}
	/**
	 * Função que salva a equipe que é passada no formato JSON pelo corpo da requisição Post
	 * url: /ws/equipe
	 * @param equipe
	 * @return
	 */
	@RequestMapping(value="/equipe", method=RequestMethod.POST)
	public ResponseEntity<Equipe> saveEquipe(@RequestBody Equipe equipe){
		Equipe eqpCriada = eqpRepository.save(equipe);
		return new ResponseEntity<>(eqpCriada, HttpStatus.CREATED);
	}
	
	/**
	 * Funçao que edita a equipe com as informações passadas no formato JSON pelo corpo da requisição PUT
	 * url: /ws/equipe
	 * @param equipe
	 * @return
	 */
	@RequestMapping(value="/equipe", method=RequestMethod.PUT)
	public @ResponseBody ResponseEntity<?> AtualizaEquipe(@RequestBody Equipe equipe) {
		Equipe eqp = eqpRepository.findOne(equipe.getId());
		if(eqp == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		eqpRepository.save(equipe);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}
	
	/**
	 * Função que deleta a equipe do id passado como parametro na url pela requisição DELETE
	 * url: /ws/equipe/id
	 * @param id
	 * @return
	 */
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

}
