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
			"	<td id='tableItem'><a href=''data-id="+ pjt.id +" class='visualizar'>" + pjt.nome + "</a></td>" +
			"	<td>" +
					"<a href='' data-nome=" + "'" + pjt.nome + "'" +" data-id="+ pjt.id +" class='deletar red-text'>" +
					"<i class='material-icons'>delete_forever</i>" +
					"</a>" +
					"<a href='' data-nome="+"'"+ pjt.nome +"'"+" data-desc="+"'"+ pjt.descricao +"'"+" data-id="+ pjt.id +" class='editar black-text'>" +
					"<i class=	'material-icons'>edit</i>" +
					"</a>" +
			"	</td>" +
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
			carregaProjetos();
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


$(document).ready(function() {
	carregaEquipes();
	carregaProjetos();
	$("#formProjeto").submit(cliqueSalvaProjeto);
});