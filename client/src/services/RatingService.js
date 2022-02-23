import api  from './api.js';
const url = "ratings/";

class RatingService{
    static getRatingByID = async (id,status) =>{
        try{
            const res = await api().get(`${url}video/${id}`,{
                params:{
                    status: status
                }
            });
            return res;
        }catch(err){
            return err.response;
        }
    }
    static checkCurrentRating = async (id) =>{
        try{
            const res = await api().get(`${url}video/${id}/current`,);
            return res;
        }catch(err){
            return err.response;
        }
    }

    static updateRating = async (id,data) => {
        try{
            const res = await api().put(`${url}video/${id}/edit`,data);
            return res;
        }catch(err){
            return err.response;
        }
    }
}

export default RatingService;