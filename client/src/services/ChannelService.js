import api  from './api.js';
const url = "channel/";
class ChannelService{

    //get current channel
    static CurrentChannel = async () =>{
        try{
            const res = await api().get(`${url}current`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //get current channel
    static ChannelByID = async (id) =>{
        try{
            const res = await api().get(`${url}${id}/details`);
            return res;
        }catch(err){
            return err.response;
        }
    }
}

export default ChannelService;