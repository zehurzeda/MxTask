var url = "/ws/projeto/"

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
	alert(JSON.stringify(projeto));
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
		url: url,
		success: preencheTabela,
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


$(document).ready(function() {
	carregaEquipes();
	carregaProjetos();
	$("#formProjeto").submit(cliqueSalvaProjeto);
});