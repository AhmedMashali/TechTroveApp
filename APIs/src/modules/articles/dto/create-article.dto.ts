import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(200, { message: 'Content must be at least 200 characters long' })
    @MaxLength(1000, { message: 'Content must be fewer than 1000 characters long' })
    content!: string;
}
