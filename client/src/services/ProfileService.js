import api  from './api.js';
const url = "users/profile/";
class ProfileService{       

    //get current profile
    static CurrentProfile = async () =>{
        try{
            const res = await api().get(`${url}current`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //get  profile by id
    static ProfileByID = async (id) =>{
        try{
            const res = await api().get(`${url}records/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }
}

export default ProfileService;