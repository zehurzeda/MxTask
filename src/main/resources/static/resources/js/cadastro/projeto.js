var url = "/ws/projeto/"

function preencheProjetos(data){
	$("#tabelaProjetos").empty()
	$.each(data, function(index, value){
		$("#tabelaProjetos").append(
			"<thead>"+
				"<tr>"+
					"<th>"+value.nome+"</th>"+
					"<th></th>"+
				"</tr>"+
			"</thead>"+
			"<tbody id="+ value.nome +"></tbody>"
		)
		if(value.projetos.length === 0){
			$("#"+value.nome).append(
				"<tr>"+
					"<td>Não há projetos nesta equipe</td>"+
					"<td></td>"+
				"</tr>"
			)
		}else{
			$.each(value.projetos, function(index, pjt){
				$("#"+value.nome).append(
					"<tr>" +
						"<td class='centerAlign'>"+
						"<a href=''data-id="+ pjt.id +" class='visualizar'>"+
						pjt.nome + "</a>"+
						"</td>" +
						"<td class='rightAlign'>" +	
							"<a href='' data-nome=" + "'o projeto " + pjt.nome + "'" +" data-id="+ pjt.id +" class='deletar red-text'>" +
								"<i class='material-icons'>delete_forever</i>" +
							"</a>" +
							"<a href='' data-nome="+"'"+ pjt.nome +"'"+" data-desc="+"'"+ pjt.descricao +"'"+" data-id="+ pjt.id +" class='editar black-text'>" +
								"<i class=	'material-icons'>edit</i>" +
							"</a>" +
						"</td>" +
					"</tr>"
				)
			})
		}
	});
	dadosFinalizados();
}

function criaProjeto(pNome, pDataAbertura, pStatus, pDescricao, pEquipeId){
	return{
		nome: pNome,
		dataAbertura: pDataAbertura,
		status: pStatus,
		descricao: pDescricao,
		equipe: {
			id: pEquipeId
		}
	}
}


function carregaEquipes(){
	var $selectDropdown = $("#selectEquipe").empty().html(' ');
	$.getJSON('/ws/equipe', function(data){
		var options = '<option value="" disabled selected>Escolha uma Equipe</option>';
		
		$.each(data, function(key, val){
			options+='<option value="'+ val.id + '">'+ val.nome + '</option>';
		});
		$selectDropdown.append(options);
		
		$selectDropdown.trigger('contentChanged');
	});
	$('select').on('contentChanged', function(){
		$(this).material_select();
	});
}

function salvaProjeto(projeto){
	$.ajax({
		url:url,
		type: "POST",
		contentType:"application/json;charset=UTF-8",
		data: JSON.stringify(projeto),
		success: function(){
			$("#formProjeto input").val("");
			Materialize.updateTextFields();
			Materialize.toast('Projeto salvo com sucesso!', 3000);
			carregaEquipes();
			carregaProjetos();
		}
	});
}

/**
 * Função Ajax que faz requisição do tipo DELETE e deleta com base no parametro ID que recebe
 * @param id de uma equipe a ser excluida
 * @returns
 */
function deletaProjeto(id){
	$.ajax({
		type: "DELETE",
		url: url+id,
		statusCode: {
			403: function(){
				$('#tipoAcao').text('exclusao!');
				$('#msgAcao').text('Há tarefas vinculadas a esta equipe, favor desvincule-as e tente novamente!');
			}
		},
		success: function(){
			Materialize.toast('Projeto excluido com sucesso!', 4000);
			carregaProjetos();
		},
		error: function(){
			$('#modalErro').modal('open');
		}
	});
}

/**
 * Função Ajax que faz uma requisição do tipo GET e recebe o JSON com a listagem de todos os projetos
 * @returns
 */
function carregaProjetos(){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: url+"equipe/",
		success: preencheProjetos,
		beforeSend: aguardaDados
	});
}


function cliqueSalvaProjeto(){
	event.preventDefault();
	var pjt = criaProjeto($('#nomeIpt').val(),
			moment().format("DD/MM/YYYY HH:mm:ss"),
			'0',
			$('#descIpt').val(),
			$("#selectEquipe option:selected").val());
	salvaProjeto(pjt);
}

/**
 * Função que realiza as ações após clique no botão 'sim' do modal de exclusão
 * obtem o id do objeto clicado e envia para a função deletaProjeto
 * @param event
 * @returns
 */
function cliqueConfirmaExclusao(event){
	var id = $('a.confirma-exclusao').attr('data-id');
	deletaProjeto(id);
}

$(document).ready(function() {
	carregaEquipes();
	carregaProjetos();
	$(document).on('click', '.deletar', cliqueExcluir);
	$("#formProjeto").submit(cliqueSalvaProjeto);
	$('#confirmaExclusao').on('click', cliqueConfirmaExclusao);
});