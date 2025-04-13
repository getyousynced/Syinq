class ErrorResponse extends Error{
    statusCode: number;
    constructor(message: string,statusCode:number){
        super(message);
        this.name = "ErrorResponse";
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorResponse;