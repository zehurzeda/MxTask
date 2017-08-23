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
			"	<td>" + value.nome + "</td>" +
			"	<td>" +
					"<a href='' data-nome=" + "'" + value.nome + "'" +" data-id="+ value.id +" class='deletar red-text'>" +
					"<i class='material-icons'>delete_forever</i>" +
					"</a>" +
					"<a href='#' data-nome="+ value.nome +" data-id="+ value.id +" class='editar black-text'>" +
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
function salvaEquipe(){
	$.ajax({
		type: "POST",
		URL: $("#formEquipe").attr('action'),
		data: {nome: $("#nomeIpt").val(), descricao: $("#descIpt").val()},
		success: function(){
			$("#formEquipe").trigger("reset");
			getDadosTabela();
			Materialize.toast('Equipe Cadastrada com sucesso!', 4000);
		}
	});
}

function deletaEquipe(id){
	$.ajax({
		URL: $("#formEquipe").attr('action')+id,
		type: 'DELETE',
		success: function(){
			getDadosTabela();
			Materialize.toast('Equipe Deletada com sucesso!', 4000);
		},
		fail: function(){
			alert(URL);
		}
	});
}

/**
 * Função Ajax que faz uma requisição do tipo GET e recebe o JSON com a listagem de todas as equipes
 * @returns
 */
function getDadosTabela(){
	$.ajax({
		type: "GET",
		dataType: "json",
		url:"/ws/equipe/",
		success: preencheTabela,
		beforeSend: aguardaDados
	});
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
	alert($("#formEquipe").attr('action')+id);
}

function cliqueSalvaEquipe(event){
	event.preventDefault();
	salvaEquipe();
}

/**
 * Função que dispara a requisição presente na função getDadosTabela() ao receber um event
 * @param event
 * @returns
 * @Sees getDadosTabela()
 */
function cliqueAtualizaTabela(event){
	event.preventDefault();
	getDadosTabela();
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
	getDadosTabela();
	$("#itemBtn").on('click', cliqueAtualizaTabela);
	$("#formEquipe").submit(cliqueSalvaEquipe);
	$('.modal').modal();
	$(document).on('click', '.deletar', cliqueExcluiEquipe);
	$('#confirmaExclusao').on('click', cliqueConfirmaExclusao);
});


