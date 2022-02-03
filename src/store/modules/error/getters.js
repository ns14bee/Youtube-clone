export default {
    getError: (state) => {
        return state.error;
    },
    getErrorMessage: (state) => {
        return state.errorMessage;
    },
    getErrorCode: (state) => {
        return state.errorCode;
    }
};