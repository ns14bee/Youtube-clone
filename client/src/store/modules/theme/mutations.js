export default{
    setTheme : (state,theme) =>{
        state.dark =theme;
    },
    setCollapse : (state,data) => {
        if(data){
            state.collapse = data
        }else{
            state.collapse = !state.collapse;
        }
    }
};