const axios = require('axios');
const forge = require('node-forge');
const URL_SEGURANCA = process.env.URL_SEGURANCA;
const AppError = require('../utils/appError');

exports.login = async (cpf, senha, token, ip, siglaSistema) => {

    let url = `${URL_SEGURANCA}/logon/logonPost`
    let data = {
        'chave': cpf,
        'senha': await encodeWithDPRFPubKey(senha),
        'ip': ip,
        'siglaSistema': siglaSistema,
        'token': token
    }

    let config = {
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }

    return await axios.post(url, data, config)
};

exports.getUsuarioById = (id) => {
    axios.get(`${URL_SEGURANCA}/usuario/${id}`)
        .then((usuario) => {
            return usuario.data
        })
        .catch((error) => console.log(error))
};

encodeWithDPRFPubKey = async (senha) => {

    let beginCert = '-----BEGIN PUBLIC KEY-----'
    let endCert = '-----END PUBLIC KEY-----'

    let chavePublica = await getPublicKey();

    if (!chavePublica) {
        throw new AppError(500, 'fail', 'Erro ao buscar chave Pública');
    }

    let chave = `${beginCert}\n${chavePublica.chaveString}\n${endCert}`;

    let encrypted = '';

    try {
        let pki = forge.pki;
        let publicKey = pki.publicKeyFromPem(chave);
        encrypted = publicKey.encrypt(senha, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
            mgf1: {
                md: forge.md.sha1.create()
            }
        })

    } catch (error) {
        console.log("carai")
    }

    return forge.util.encode64(encrypted)
}

getPublicKey = async () => {

    let url = `${URL_SEGURANCA}/logon/chavePublica`
    return await axios
        .get(url, {
            headers: {
                // remove headers
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return null;
        })
}