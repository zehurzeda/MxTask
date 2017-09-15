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
 * Função que realiza as ações após clique no botão 'Excluir' de algum objeto da table
 * necessita ter o modal 'confirmaExclusão' no html
 * preenche o modal com os dados do objeto clicado.
 * @param event
 * @returns
 */
function cliqueExcluir(event){
	event.preventDefault();
	var nome = $(this).data('nome');
	var id = $(this).data('id');
	$('#nomeExclusao').text(nome);
	$("a.confirma-exclusao").attr('data-id', id);
	$('#modalExclusao').modal('open');
}

