import connection from '../database/db.js';

 export function read(callback){
    connection.query('SELECT * from filme', (err, result) => {
        if (err) {
            console.error('Erro ao ler dados do banco de dados:', err);
            callback(err, null);
            return;
        }
        console.log('Dados lidos do banco de dados:', result);
        callback(null, result);
    });
}

export function create(titulo, data_lancamento, generos, sinopse, url_poster, callback){
    if (typeof callback !== 'function') {
        console.error('O argumento de callback não é uma função.');
        return;
    }
    connection.query('INSERT INTO filme (titulo, data_lancamento, generos, sinopse, url_poster) VALUES (?, ?, ?, ?, ?)', [titulo, data_lancamento, generos, sinopse, url_poster], callback);
}


export function update(id, novoDados, callback) {
    connection.query('UPDATE filme SET ? WHERE id = ?', [novoDados, id], callback);

}

export function deleteFil(id, callback){

    connection.query('DELETE from cineflix.filme where id = ?', [id], callback);

}