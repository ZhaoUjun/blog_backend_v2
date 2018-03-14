
export class CreateArticleDto {
    readonly content: string;
    readonly title: string;
    readonly authorId: string;
    readonly tagIds:number[];
}