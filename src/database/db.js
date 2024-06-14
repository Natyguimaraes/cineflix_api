import mysql from 'mysql';

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456789',
    database:'cineflix'
})
connection.connect((err) => {
    if (err) {
        console.error('erro ao realizar conexão com o banco de dados', err);
        throw err;
    }

    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

export default connection;