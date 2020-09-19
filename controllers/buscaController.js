const axios = require('axios');
const AppError = require('../utils/appError');
const https = require('https')
const URL_PONTOS = process.env.URL_PONTOS;
const TOKEN = process.env.TOKEN;

const agent = new https.Agent({
    rejectUnauthorized: false
});

exports.buscaPontos = async (req, res, next) => {

    let query = req.query;

    let params = new URLSearchParams();

    let busca = query.busca

    if (query.uf) {
        params.append("uf", query.uf)
    }

    if (query.municipio) {
        params.append("municipio", query.municipio)
    }

    if (query.categoria) {
        params.append("categoria", query.categoria)
    }

    if (query.br) {
        params.append("rodovia", query.br)
    }

    try {
        let resultado = await axios.get(`${URL_PONTOS}/${busca}`, {
            params: params,
            timeout: 10000,
            httpsAgent: agent,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        res.json(resultado.data)
    } catch (e) {
        return next(new AppError(401, 'fail', `Erro na busca - ${e.message}`), req, res, next);
    }
};
