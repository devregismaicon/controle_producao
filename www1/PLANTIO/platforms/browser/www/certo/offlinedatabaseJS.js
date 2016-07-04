var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) { // verifica se o banco de dados local abriu.
            updateStatus("Erro: Seu navegador não permite banco de dados.");
        }
        else {// caso o banco de dados funcione, execute as seguintes funções.
            initDB();
            createTables();
            //queryAndUpdateOverview();// função que atualiza a pagina toda vez que ela é recarregada.
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Erro: Versão de banco de dados inválida.");
        }
        else {
            updateStatus("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}

function initDB(){ // função responsavel por iniciar a conexão com o banco local.
    var shortName = 'stuffDB';// Nome do servidor.
    var version = '1.0';
    var displayName = 'MyStuffDB';
    var maxSize = 65536; // Em bytes, tamanho máximo do banco.
    localDB = window.openDatabase(shortName, version, displayName, maxSize);// variável responsavel pela conexão do banco.
}

function createTables(){// função responsavel por criar as tabelas.
    var query1='CREATE TABLE IF NOT EXISTS PRODUTO1(ID_PRODUTO INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,NOME_PRODUTO VARCHAR(200) NOT NULL UNIQUE, DIAS_PRODUCAO VARCHAR(3) NOT NULL);';
    var query2='CREATE TABLE IF NOT EXISTS PROJETO(ID_PROJETO INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,NOME_PROJETO VARCHAR(100) NOT NULL,DESCRICAO_PROJETO  VARCHAR(100) NOT NULL,COR_PROJETO VARCHAR(30) NOT NULL,DATA_FIM_PROJETO DATE NOT NULL);';
    var query3='CREATE TABLE IF NOT EXISTS AGENDAMENTO(ID_PROJETO_AGENDAMENTO INTEGER,ID_PRODUTO_AGENDAMENTO INTEGER,DATA_INICIO_PRODUTO DATE,FOREIGN KEY(ID_PROJETO_AGENDAMENTO) REFERENCES PROJETO(ID_PROJETO),FOREIGN KEY(ID_PRODUTO_AGENDAMENTO) REFERENCES PRODUTO(ID_PRODUTO));';
    try {
        localDB.transaction(function(transaction){// Toda vez que for execurtar o código sql é necessário criar uma transação.
            transaction.executeSql(query1, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'PRODUTO' status: OK.");
        });
        localDB.transaction(function(transaction){// Toda vez que for execurtar o código sql é necessário criar uma transação.
        transaction.executeSql(query2, [], nullDataHandler, errorHandler);
        updateStatus("Tabela 'PROJETO' status: OK.");
        });
         localDB.transaction(function(transaction){// Toda vez que for execurtar o código sql é necessário criar uma transação.
        transaction.executeSql(query3, [], nullDataHandler, errorHandler);
        updateStatus("Tabela 'AGENDAMENTO' status: OK.");
        });


    } 
    catch (e) {
        updateStatus("Erro: O banco não pode ser não criada " + e + ".");
        return;
    }
}
// Começo das Funções criadas pelo Gabriel Roveri Silva
function dropTables(){// função responsavel por dropar as tabelas do banco de dados.
    var query = 'DROP TABLE PRODUTO;';
    try {
        localDB.transaction(function(transaction){// Toda vez que for execurtar o código sql é necessário criar uma transação.
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela excluida com sucesso !");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base não excluida " + e + ".");
        return;
    }
}
function deleteDados(){// função responsavel por dropar as tabelas do banco de dados.
    var query = 'delete from produto1 where ID_PRODUTO=1;';
    try {
        localDB.transaction(function(transaction){// Toda vez que for execurtar o código sql é necessário criar uma transação.
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Linha excluida com sucesso !");
        });
    } 
    catch (e) {
        updateStatus("Erro: A linha não pode ser excluida " + e + ".");
        return;
    }
}
function insertDados(){// função responsavel por inserir dados na tabela.
        var product_name = (document.getElementById('nome_produto').value);
        var product_days = (document.getElementById('days').value);
    var query = "insert into PRODUTO1(NOME_PRODUTO,DIAS_PRODUCAO) values(?,?);";
        try {
        localDB.transaction(function(transaction){// Toda vez que for execurtar o código sql é necessário criar uma transação.
            transaction.executeSql(query, [product_name,product_days], nullDataHandler, errorHandler);
            updateStatus("Linha inserida com sucesso !");
        });
    } 
    catch (e) {
        updateStatus("Erro: A linha não pode ser inserida " + e + ".");
        return;
    }
}
function selecionaDados(){

    var query = "SELECT * FROM PRODUTO1;";// Código sql
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){// Toda vez que for execurtar o código sql é necessário criar uma transação.
                for (var i = 0; i < results.rows.length; i++) {
                    
                    var row = results.rows.item(i);
                    alert(row['ID_PRODUTO']+row['NOME_PRODUTO']+row['DIAS_PRODUCAO']);//row['idade'] variável responsavel por 
                    
                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não pode ser realizado " + e + ".");
    }
}

// Fim das funções criadas por Gabriel Roveri Silva


// 2. Funções de tratamento e status.



errorHandler = function(transaction, error){// Função responsavel por tratamento de erro.
    updateStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){// Função responsavel por tratamento de erro.
}



function updateStatus(status){ // Funções de update de formulário.
    document.getElementById('status').innerHTML = status;
}