package com.mx.cam.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mx.cam.security.UsuarioSistema;

@Controller
@RequestMapping("/cadastro")
public class CadastroController {
	
	@GetMapping("/equipe")
	public ModelAndView equipe(@AuthenticationPrincipal UsuarioSistema user) {
		ModelAndView mv = new ModelAndView("cadastro/equipe");
		mv.addObject("usuario", user);
		
		return mv;
	}
	
	@GetMapping("/projeto")
	public ModelAndView prjeto(@AuthenticationPrincipal UsuarioSistema user) {
		ModelAndView mv = new ModelAndView("cadastro/projeto");
		mv.addObject("usuario", user);
		
		return mv;
	}
	
	
}
