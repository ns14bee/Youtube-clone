
import api  from '../api.js';
const url = "users/";


class UserService{

    //get users
    static getUsers = async () =>{
        try{
            const res = await api().get(`${url}records`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    // create users
    static createUsers =  async (data) =>{
        try{
            const res = await api().post(`${url}register`,data);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //login user
    static loginUser = async (data) =>{
        try{
            const res = await api().post(`${url}login`,data);
            return res;
        }catch(err){
            return err.response;
        }
    }

}

export default UserService;