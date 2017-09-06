//Objeto usado para editar equipes
var Equipe = function(id, nome, descricao){
	this.id = id;
	this.nome = nome;
	this.descricao = descricao;
}

//Objeto usado para salvar equipes
var NovaEquipe = function(nome, descricao){
	this.nome = nome;
	this.descricao = descricao;
}

var url = "/ws/equipe/";

/**
 * Preenche tabela de usuarios e projetos da equipe com os dados da requisição Ajax
 * @param data, vinda da requisição ajax
 * @returns
 */
function preencheEquipe(data){
	$("#tableUsuarios > tbody").empty()
	$("#tableProjetos > tbody").empty()
	$("#nomeEquipeView").text(data.nome);
	$("#descView").text(data.descricao);
	if (data.usuarios.length == 0) {
		$("#tableUsuarios > tbody").append(
			"<tr>" +
			"	<td>Não há usuarios vinculados a esta equipe</td>" +
			"</tr>"	
		);
	}else {
		$.each(data.usuarios, function(index, value){
			$("#tableUsuarios > tbody").append(
					"<tr>" +
					"	<td><a><img class='circle' src="+value.imgPerfilPeq+"/></a></td>" +
					"	<td>"+value.id+"</td>" +
					"	<td>"+value.nome+"</td>" +
					"</tr>"	
			);
		});	
	}
	if (data.projetos.length == 0) {
		$("#tableProjetos > tbody").append(
			"<tr>" +
			"	<td>Não há projetos vinculados a esta equipe</td>" +
			"</tr>"	
		);
	}else {
		$.each(data.projetos, function(index, value){
			$("#tableProjetos > tbody").append(
					"<tr>" +
					"	<td>"+value.id+"</td>" +
					"	<td>"+value.nome+"</td>" +
					"	<td>"+value.descricao+"</td>" +
					"</tr>"	
			);
		});	
	}
	
}

/**
 * Função Ajax que faz requisição do tipo POST e envia o json para o ws para salvamento da equipe inserida
 * @returns
 */
function salvaEquipe(NovaEquipe){
	$.ajax({
		url: url,
		type: "POST",
		contentType:"application/json;charset=UTF-8",
		data: JSON.stringify(NovaEquipe),
		success: function(){
			$("#formEquipe input").val("");
			Materialize.updateTextFields();
			Materialize.toast('Equipe salva com sucesso!', 4000);
			carregaEquipes();
		}
	});
}

/**
 * Função Ajax que faz requisição do tipo DELETE e deleta com base no parametro ID que recebe
 * @param id de uma equipe a ser excluida
 * @returns
 */
function deletaEquipe(id){
	$.ajax({
		type: "DELETE",
		url: url+id,
		statusCode: {
			403: function(){
				$('#tipoAcao').text('exclusao!');
				$('#msgAcao').text('Há usuários vinculados a esta equipe, favor desvincule-os e tente novamente!');
			}
		},
		success: function(){
			Materialize.toast('Equipe excluida com sucesso!', 4000);
			carregaEquipes();
		},
		error: function(){
			$('#modalErro').modal('open');
		}
	});
}

/**
 * Função Ajax que faz requisição do tipo PUT e envia um JSON para o ws para editar a equipe que foi passada como
 * parametros.
 * @param Equipe que contém toda os dados da equipe a ser editada
 * @returns
 */
function editaEquipe(Equipe){
	$.ajax({
		url: url,
		type: "PUT",
		contentType:"application/json;charset=UTF-8",
		data: JSON.stringify(Equipe),
		success: function(){
			Materialize.toast('Edição concluida com sucesso!', 4000);
			carregaEquipes();
		}
	});
}

/**
 * Função Ajax que faz uma requisição do tipo GET e recebe o JSON com a listagem de todas as equipes
 * @returns
 */
function carregaEquipes(){
	$.ajax({
		type: "GET",
		dataType: "json",
		url:url,
		success: preencheTabela,
		beforeSend: aguardaDados
	});
}

/**
 * Função Ajax que faz uma requisição do tipo GET e recebe o JSON com os dados de uma equipe
 * @param id da equipe a ser pesquisada
 * @returns
 */
function carregaEquipe(id){
	$.ajax({
		type: "GET",
		dataType: "json",
		url:'/ws/equipe/'+id,
		success: preencheEquipe
	})
}

/**
 * Função que realiza as ações apos clique no botão 'salvar' no form de adicionar equipe
 * cria um objeto do tipo NovaEquipe com os dados inseridos o input e chama a função
 * salvaEquipe com estes dados
 * @param event
 * @returns
 */
function cliqueSalvaEquipe(event){
	event.preventDefault();
	var eqp = new NovaEquipe($('#nomeIpt').val(), $('#descIpt').val())
	salvaEquipe(eqp);
}

/**
 * Função que realiza as ações apos clique no botão 'Editar' na tabela de equipes
 * cria um objeto do tipo Equipe com os dados da equipe clicada e preenche o modal de edição;
 * salvaEquipe com estes dados
 * @param event
 * @returns
 */
function cliqueEditaEquipe(event){
	event.preventDefault();
	var eqp = new Equipe($(this).data('id'), $(this).data('nome'), $(this).data('desc'));
	$('#nomeEdt').val(eqp.nome);
	$('#descEdt').val(eqp.descricao);
	$("a.confirma-edicao").attr('data-id', eqp.id);
	$('#modalEdicao').modal('open');
	Materialize.updateTextFields();
}

/**
 * Função que realiza as ações após clique no botão 'Salvar' do Modal de edição
 * cria um objeto do tipo Equipe com os dados dos inputs e envia para a função
 * editaEquipe
 * @param event
 * @returns
 */
function cliqueConfirmaEdicao(event){
	var eqp = new Equipe ($("a.confirma-edicao").attr('data-id'), $('#nomeEdt').val(), $('#descEdt').val());
	editaEquipe(eqp);
}

/**
 * Função que realiza as ações após clique no botão 'Exclusao' na tabela de equipes
 * preenche o modal com os dados da Equipe clicada.
 * @param event
 * @returns
 */
function cliqueExcluiEquipe(event){
	event.preventDefault();
	var nome = $(this).data('nome');
	var id = $(this).data('id');
	$('#nomeEquipe').text(nome);
	$("a.confirma-exclusao").attr('data-id', id);
	$('#modalExclusao').modal('open');
}

/**
 * Função que realiza as ações após clique no botão 'sim' do modal de exclusão de equipe
 * obtem o id da equipe clicada e envia para a função deletaEquipe
 * @param event
 * @returns
 */
function cliqueConfirmaExclusao(event){
	var id = $('a.confirma-exclusao').attr('data-id');
	deletaEquipe(id);
}

/**
 * Função que realiza as ações após clique na opção de view
 * envia o id da equipe clicada e envia-o para  a função carregaEquipe e abre o modal;
 * @param event
 * @returns
 */
function cliqueViewEquipe(event){
	event.preventDefault();
	carregaEquipe($(this).data('id'));
	$('#modalView').modal('open');
}

/**
 * Função que dispara a requisição presente na função carregaEquipes
() ao receber um event
 * @param event
 * @returns
 * @Sees carregaEquipes
()
 */
function cliqueAtualizaTabela(event){
	event.preventDefault();
	carregaEquipes();
}

//Função que é executada após o DOM ser carregado
//função padrão do jquery
$(document).ready(function() {
	carregaEquipes();
	$("#itemBtn").on('click', cliqueAtualizaTabela);
	$("#formEquipe").submit(cliqueSalvaEquipe);
	$(document).on('click', '.deletar', cliqueExcluiEquipe);
	$(document).on('click', '.editar', cliqueEditaEquipe);
	$(document).on('click', '.visualizar', cliqueViewEquipe);
	$('#confirmaExclusao').on('click', cliqueConfirmaExclusao);
	$('#confirmaEdicao').on('click', cliqueConfirmaEdicao);
});