import ISession from "../interface/isession.interface";


export default class Session implements ISession {
    email: string;
    token: string;

    constructor() {
        this.email = '';
        this.token = '';
    }

    public static create(data: any): Session {
        const session = new Session();

        session.email =  data?.email || '';
        session.token =  data?.token || '';

        return session;
    }
}