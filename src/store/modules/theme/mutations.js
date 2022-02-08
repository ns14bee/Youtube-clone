export default{
    setTheme : (state,theme) =>{
        state.dark =theme;
    },
    setCollapse : (state) => {
        state.collapse = !state.collapse;
    }
};