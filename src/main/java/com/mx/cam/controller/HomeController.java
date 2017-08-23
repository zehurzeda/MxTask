package com.mx.cam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mx.cam.model.Projeto;
import com.mx.cam.repository.Projetos;
import com.mx.cam.security.UsuarioSistema;

@Controller
public class HomeController {
	
	@Autowired
	private Projetos assuntos;
	
	@GetMapping("/")
	public ModelAndView index(@AuthenticationPrincipal UsuarioSistema user) {
		ModelAndView mv = new ModelAndView("inicio");
		mv.addObject("usuario", user);
		mv.addObject("projeto", new Projeto());
		
		return mv;
	}
	
	@GetMapping("usuario")
	public ModelAndView usuario(@AuthenticationPrincipal UsuarioSistema user) {
		ModelAndView mv = new ModelAndView("usuario");
		mv.addObject("usuario", user);
		
		return mv;
	}


}
