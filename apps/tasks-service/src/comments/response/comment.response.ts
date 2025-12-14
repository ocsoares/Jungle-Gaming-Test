export interface ICommentResponse {
    readonly content: string;
    readonly taskId: string;
    readonly authorId: string;
}

export interface ICommentGetAllResponse {
    readonly data: ICommentResponse[];
    readonly total: number;
    readonly page: number;
    readonly size: number;
    readonly totalPages: number;
}
