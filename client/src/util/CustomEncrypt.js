import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

let secret = process.env.VUE_APP_SECRET;

class CustomEncrypt{

    static encrypt(data){
        return AES.encrypt(JSON.stringify(data),secret).toString();
    }

    static decrypt(data){
        try{
            return JSON.parse(AES.decrypt(data,secret).toString(encUTF8));
        }catch(err){
            console.log(err);
            return data;
        }
    }

}

export default CustomEncrypt