export default {
    getTheme: (state) => {
        return state.dark;
    },
    getImgLink: (state) => {
        if(state.dark){
            return 'icons/dark';
        }else{
            return 'icons/light';
        }
    },
    getCssLink: (state) => {
        if(state.dark){
            return 'css/style_dark_min.css';
        }else{
            return 'css/style_light_min.css';
        }
    },
    getCollapse: (state) => {
        return state.collapse;
    }
};