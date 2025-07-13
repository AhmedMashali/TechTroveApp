import { IsMongoId } from 'class-validator';

export class GetSingleArticleDto {
    @IsMongoId({ message: 'Invalid article ID format' })
    _id!: string;
}
