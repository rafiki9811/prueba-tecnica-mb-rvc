import ILoginResponse from "../interface/login-response.interface";

export default class LoginResponse implements ILoginResponse{
    token: string;

    constructor(){
        this.token = '';
    }

    public static create(data: any): LoginResponse{
        const login = new LoginResponse();
        
        login.token = data?.token || '';

        return login;
    }
}
