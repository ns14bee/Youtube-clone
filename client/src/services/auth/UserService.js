
import api  from '../api.js';
const url = "users/";


class UserService{

    //get users
    static getUsers = async (page,limit) =>{
        try{
            const res = await api().get(`${url}records`, {
                params: {
                    page: page,
                    limit: limit
                },
            });
            return res;
        }catch(err){
            return err.response;
        }
    }

    //current users
    static current = async () => {
        try{
            const res = await api().get(`${url}current`);
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

    //user by id 
    static getUserByID = async (id) =>{
        try{
            const res = await api().get(`${url}records/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }
}

export default UserService;