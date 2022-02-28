import api  from './api.js';
const url = "videos/";

let config = {
        header : {
            'Content-Type' : 'multipart/form-data'
        }
    }
class VideoService{

    //get all videos
    static getAll = async (page,limit) =>{
        try{
            const res = await api().get(`${url}`,{
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

    //  get current user videos
    // sort : 1 = ascending, 2 = descending, 3 = view: descending 
    // type: 0 = all ,  1 = public, 2 = private, 3 = unlisted

    static getCurrent = async (id,page,limit,sort,type) => {
        try{
            const res = await api().get(`${url}channel/${id}/all`,{
                params: {
                    page: page,
                    limit: limit,
                    sort: sort,
                    type: type
                },
            });
            return res;
        }catch(err){
            return err.response;
        }
    }

    // get video by id
    static getVideoByID = async (id) => {
        try{
            const res = await api().get(`${url}${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    // Update views video by id
    static UpdateVideoView = async (id) => {
        try{
            const res = await api().put(`${url}video/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    // upload video 
    static UploadVideo = async (id,data) => {
        try{
            const res = await api().post(`${url}channel/${id}/upload`,data,config);
            return res;
        }catch(err){
            return err.response;
        }
    }

}

export default VideoService;