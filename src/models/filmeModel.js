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

export function create(titulo, data_lancamento, generos, sinopse, url_poster) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO filme (titulo, data_lancamento, generos, sinopse, url_poster) VALUES (?, ?, ?, ?, ?)', 
            [titulo, data_lancamento, generos, sinopse, url_poster], 
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
}

export function update(id, novoDados, callback) {
    connection.query('UPDATE filme SET ? WHERE id = ?', [novoDados, id], callback);

}

export function deleteFil(id, callback){

    connection.query('DELETE from cineflix.filme where id = ?', [id], callback);

}