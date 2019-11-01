export class APIResponse {
    private status: string;
    private code: number;
    private responseType: string | undefined;
    private message: string;
    private data: [] | undefined | {};
    private links: string | undefined;
    private pagination: string | undefined;

    public constructor(
        status: string,
        code: number,
        message: string,
        responseType?: string | undefined,
        data?: [] | object | undefined,
        pagination?: string | undefined) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.pagination = pagination;
        this.responseType = responseType;
    }
}
