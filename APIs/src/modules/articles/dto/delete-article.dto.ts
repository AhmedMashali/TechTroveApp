import { IsMongoId } from 'class-validator';

export class DeleteArticleDto {
    @IsMongoId({ message: 'Invalid article ID format' })
    _id!: string;
}
