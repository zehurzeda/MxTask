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

import com.mx.cam.model.Projeto;
import com.mx.cam.repository.Projetos;

@RestController
@RequestMapping("/ws")
public class ProjetoWs {
	@Autowired
	private Projetos pjtRepository;
	
	/**
	 * Função que retorna por requisição get Todos os projetos cadastradas no banco
	 * url: /ws/projeto
	 * @return Lista<Projeto> populada com todos os projetos
	 */
	@RequestMapping(value="/projeto", method=RequestMethod.GET)
	public List<Projeto> findAllProjeto(){
		return pjtRepository.findAll();
	}
	
	/**
	 * Função que retorna por requisição get o projeto solicitado por parametro na url
	 * @param id da url '/ws/projeto/id'
	 * @return
	 */
	@RequestMapping(value="/projeto/{projetoId}", method=RequestMethod.GET)
	public Projeto findOneProjeto(@PathVariable(value="projetoId")Long id) {
		return pjtRepository.findOne(id);
	}
	/**
	 * Função que salva o projeto que é passado no formato JSON pelo corpo da requisição Post
	 * url: /ws/projeto
	 * @param projeto
	 * @return
	 */
	@RequestMapping(value="/projeto", method=RequestMethod.POST)
	public ResponseEntity<Projeto> saveProjeto(@RequestBody Projeto projeto){
		Projeto pjtCriado = pjtRepository.save(projeto);
		return new ResponseEntity<>(pjtCriado, HttpStatus.CREATED);
	}
	
	/**
	 * Funçao que edita o projeto com as informações passadas no formato JSON pelo corpo da requisição PUT
	 * url: /ws/projeto
	 * @param projeto
	 * @return
	 */
	@RequestMapping(value="/projeto", method=RequestMethod.PUT)
	public @ResponseBody ResponseEntity<?> AtualizaProjeto(@RequestBody Projeto projeto) {
		Projeto pjt = pjtRepository.findOne(projeto.getId());
		if(pjt == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		pjtRepository.save(projeto);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}
	
	/**
	 * Função que deleta o projeto do id passado como parametro na url pela requisição DELETE
	 * url: /ws/projeto/id
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/projeto/{projetoId}", method=RequestMethod.DELETE)
	public @ResponseBody ResponseEntity<?> DeleteProjeto(@PathVariable(value="projetoId") Long id) {
		Projeto projeto = pjtRepository.findOne(id);
		
		if(projeto == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		try {
			pjtRepository.delete(projeto);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
