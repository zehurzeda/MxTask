package com.mx.cam.model.views;

public class UserView {
	public interface PublicView{}
	
	//Views de Usuário
	public interface UsuarioView extends PublicView{}
	public interface UsuarioAllView extends UsuarioView{}
	
	//View de Equipe
	public interface EquipeView extends PublicView{}
}
