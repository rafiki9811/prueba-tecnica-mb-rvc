import IAPIResponse from "../interface/iapi-response.interface";

export class APIResponse implements IAPIResponse{
    status: number;
    data: any;
    message: string;

    constructor(){
        this.status = 0;
        this.data =  null;
        this.message = '';
    }

    public create(data: any): APIResponse{
        const apiReponse: APIResponse = new APIResponse;

        apiReponse.data = data?.data;
        apiReponse.message = data?.message;
        apiReponse.status = data?.status;
        return apiReponse;
    }

}