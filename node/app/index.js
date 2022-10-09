const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config);

connection.query("CREATE DATABASE IF NOT EXISTS desafio", function(err, res) {
    if(err) throw err;
    console.log("Criado o banco desafio");
})

connection.query("CREATE TABLE IF NOT EXISTS desafio.pessoa(id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, PRIMARY KEY (id))", function(err, res) {
    if(err) throw err;
    console.log("Criada a tabela pessoa");
})

connection.query("DELETE FROM desafio.pessoa", function(err, res) {
    if(err) throw err;
    console.log("Limpar tabela (caso exista)");
})

connection.query("INSERT INTO desafio.pessoa(nome) VALUES ('Guilherme'), ('Maria'), ('João'), ('Marcos')", function(err, res) {
    if(err) throw err;
    console.log("Criadas pessoas na tabela");
})

connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)

    connection.query("SELECT nome FROM desafio.pessoa", function (err, result) {
        let tableNomes = `
            <table>
            <tr>
                <th>
                Nomes
                </th>
                {{nomes}}
            </tr>
            </table>`
        let tdNomes = ""
        
        if (err) throw err;
        console.log("Query executada com sucesso");
        
        if (!result) throw "Pessoas não localizadas";

        result.forEach(n => {
          tdNomes += `
          <tr>
            <td>
              ${n.nome}
            </td>
          </tr>`
        })

        tableNomes = tableNomes.replace("{{nomes}}", tdNomes)

        res.send(`<h1>Full Cycle Rocks!</h1>${tableNomes}`)
    })

    connection.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})