const { init } = require("next/dist/compiled/webpack/webpack");

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    register_success: false
};


const auth = (state = initialState, action) => {
    const {type, payload} = state

    switch(type){
        default: state
    }
}

export default auth;