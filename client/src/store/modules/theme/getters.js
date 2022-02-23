const baseUrl = process.env.VUE_APP_BASE_URL;
export default {
    getTheme: (state) => {
        return state.dark;
    },
    getImgLink: (state) => {
        if(state.dark){
            return `${baseUrl}icons/dark`;
        }else{
            return `${baseUrl}icons/light`;
        }
    },
    getCssLink: (state) => {
        if(state.dark){
            return `${baseUrl}css/style_dark_min.css`;
        }else{
            return `${baseUrl}css/style_light_min.css`;
        }
    },
    getCollapse: (state) => {
        return state.collapse;
    }
};