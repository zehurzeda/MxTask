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

/**
 * Preenche tabela de equipes com os dados da requisição Ajax
 * @param data, vinda da requisição ajax
 * @returns
 */
function preencheTabela(data){
	$("#tabelaPadrao > tbody").empty()
	$.each(data, function(index, value){
		$("#tabelaPadrao > tbody").append(
			"<tr>" +
			"	<td>" + value.id + "</td>" +
			"	<td><a href=''data-id="+ value.id +" class='visualizar'>" + value.nome + "</a></td>" +
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