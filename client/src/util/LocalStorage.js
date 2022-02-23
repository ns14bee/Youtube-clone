import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

// update ls config
ls.config.encrypt = process.env.VUE_APP_ENCRYPT;
ls.config.secret = process.env.VUE_APP_SECRET;

// use aes encrypt
ls.config.encrypter = (data,secret) => {
    return AES.encrypt(JSON.stringify(data),secret).toString();
}

// use aes decrypt
ls.config.decrypter = (data,secret) => {
    try{
        return JSON.parse(AES.decrypt(data,secret).toString(encUTF8));
    }catch(err){
        console.log(err);
        ls.remove('token');
    }
}

export default ls;