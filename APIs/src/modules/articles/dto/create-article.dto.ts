import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(50, { message: 'Content must be at least 50 characters long' })
    @MaxLength(10000, { message: 'Content must be fewer than 10000 characters long' })
    content!: string;
}
