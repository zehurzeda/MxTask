var Equipe = function(id, nome, descricao){
	this.id = id;
	this.nome = nome;
	this.descricao = descricao;
}

var NovaEquipe = function(nome, descricao){
	this.nome = nome;
	this.descricao = descricao;
}

/**
 * Preenche tabela de equipes com os dados da requisição Ajax
 * @param data, vinda da requisição ajax
 * @returns
 */
function preencheTabela(data){
	$("#tableEquipes > tbody").empty()
	$.each(data, function(index, value){
		$("#tableEquipes > tbody").append(
			"<tr>" +
			"	<td>" + value.id + "</td>" +
			"	<td><a href=''data-id="+ value.id +" >" + value.nome + "</a></td>" +
			"	<td>" +
					"<a href='' data-nome=" + "'" + value.nome + "'" +" data-id="+ value.id +" class='deletar red-text'>" +
					"<i class='material-icons'>delete_forever</i>" +
					"</a>" +
					"<a href='' data-nome="+"'"+ value.nome +"'"+" data-desc="+"'"+ value.descricao +"'"+" data-id="+ value.id +" class='editar black-text'>" +
					"<i class='material-icons'>edit</i>" +
					"</a>" +
			"	</td>" +
			"</tr>"				
		);
	});
	dadosFinalizados();
}

/**
 * Função Ajax que faz requisição do tipo POST e envia o json para o ws para salvamento da equipe inserida
 * @returns
 */
function salvaEquipe(NovaEquipe){
	$.ajax({
		url:'/ws/equipe/',
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

function deletaEquipe(id){
	$.ajax({
		type: "DELETE",
		url:"/ws/equipe/"+id,
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


function editaEquipe(Equipe){
	$.ajax({
		url:'/ws/equipe/',
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
		url:"/ws/equipe/",
		success: preencheTabela,
		beforeSend: aguardaDados
	});
}

function cliqueEditaEquipe(event){
	event.preventDefault();
	var eqp = new Equipe($(this).data('id'), $(this).data('nome'), $(this).data('desc'));
	$('#nomeEdt').val(eqp.nome);
	$('#descEdt').val(eqp.descricao);
	$("a.confirma-edicao").attr('data-id', eqp.id);
	$('#modalEdicao').modal('open');
	Materialize.updateTextFields();
}


function cliqueExcluiEquipe(event){
	event.preventDefault();
	var nome = $(this).data('nome');
	var id = $(this).data('id');
	$('#nomeEquipe').text(nome);
	$("a.confirma-exclusao").attr('data-id', id);
	$('#modalExclusao').modal('open');
}

function cliqueConfirmaExclusao(event){
	var id = $('a.confirma-exclusao').attr('data-id');
	deletaEquipe(id);
}

function cliqueConfirmaEdicao(event){
	var eqp = new Equipe ($("a.confirma-edicao").attr('data-id'), $('#nomeEdt').val(), $('#descEdt').val());
	editaEquipe(eqp);
}

function cliqueSalvaEquipe(event){
	event.preventDefault();
	var eqp = new NovaEquipe($('#nomeIpt').val(), $('#descIpt').val())
	salvaEquipe(eqp);
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
	carregaEquipes
();
}

/**
 * Função que preenche a div "#itemBtn" com um botão
 * @returns
 */
function dadosFinalizados(){
	$("#itemBtn").html("<button id='refreshTable' class='btn blue waves-effect waves-ligt' >Atualizar tabela</button>");
}

/**
 * Função que preenche a div "#itemBtn" com um gif de loading
 * @returns
 */
function aguardaDados(){
	$("#itemBtn").html("<img  src='/resources/images/loading.gif'/>");
}

$(document).ready(function() {
	carregaEquipes();
	$("#itemBtn").on('click', cliqueAtualizaTabela);
	$("#formEquipe").submit(cliqueSalvaEquipe);
	$('.modal').modal();
	$(document).on('click', '.deletar', cliqueExcluiEquipe);
	$(document).on('click', '.editar', cliqueEditaEquipe);
	$('#confirmaExclusao').on('click', cliqueConfirmaExclusao);
	$('#confirmaEdicao').on('click', cliqueConfirmaEdicao);
});