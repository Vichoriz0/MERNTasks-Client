import axiosClt from "./axios";

const tokenAuth = token => {
    if( token )
        axiosClt.defaults.headers.common['x-auth-token'] = token;
    else
        delete axiosClt.defaults.headers.common['x-auth-token'];
};

export default tokenAuth;