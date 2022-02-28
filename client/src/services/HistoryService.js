import api  from './api.js';
const url = "history/";

class HistoryService{

    // get history of current channel
    static getHistoryOfCurrent = async (page,limit) => {
        try{
            const res = await api().get(`${url}channel`,
            {
                params:{
                    page: page,
                    limit: limit
                }
            });
            return res;
        }catch(err){
            return err.response;
        }
    }

    // get history by video id
    static getHistoryByVideo = async (id) => {
        try{
            const res = await api().get(`${url}video/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    // Update history video by id
    static UpdateHistory = async (id,data) => {
        try{
            const res = await api().put(`${url}edit/video/${id}`,data);
            return res;
        }catch(err){
            return err.response;
        }
    }

}

export default HistoryService;