import api  from './api.js';
const url = "subscription/";

class SubscriptionService{

    //get subscriber count of a user
    static getSubscriberCount = async (id) =>{
        try{
            const res = await api().get(`${url}creator/${id}/count`);
            return res;
        }catch(err){
            return err.response;
        }
    }

     //get subscription of current user
    static getSubscriptionOfCurrent = async () => {
        try{
            const res = await api().get(`${url}subscriber/current`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //get subscription of users
    static getSubscriptionByUser = async (id) => {
        try{
            const res = await api().get(`${url}subscriber/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //get subscriber of users
    static getSubscriptionByUser = async (id) => {
        try{
            const res = await api().get(`${url}creator/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //check subscription
    static checkSubscription = async (id) => {
        try{
            const res = await api().get(`${url}check/${id}`);
            return res;
        }catch(err){
            return err.response;
        }
    }

    //update subscription
    static UpdateSubscription = async (id) => {
        try{
            const res = await api().put(`${url}channel/${id}/edit`);
            return res;
        }catch(err){
            return err.response;
        }
    }

}

export default SubscriptionService;