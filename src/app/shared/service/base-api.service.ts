import { HttpHeaders } from "@angular/common/http"
import { enviroment } from "src/environment/enviroment.dev"

export default class BaseApiService {
    base: string = enviroment.base_api;
    endpoint: string = '';
    full_url: string = '';
    time_out: number = enviroment.timeout;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.full_url = `${this.base}${endpoint}`;
    }

    public HttpHeadersBearer(): HttpHeaders{
        const token = '';
        return new HttpHeaders({
            Authorization: `Bearer ${token || ''}`,
            'Content-Type': 'application/json',
            Accept: 'application'
        });
    }

    public getBasicHttpRequestHeaders(): HttpHeaders{
        const token = '';
        return new HttpHeaders({
            //Authorization: `Bearer ${token || ''}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'

        });
    }
}