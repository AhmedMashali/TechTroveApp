import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateArticleDto {
    @IsNotEmpty()
    @IsString()
    _id!: string;

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(30, { message: 'Description must be at least 30 characters long' })
    @MaxLength(250, { message: 'Description must be fewer than 250 characters long' })
    description!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(200, { message: 'Content must be at least 200 characters long' })
    @MaxLength(1000, { message: 'Content must be fewer than 1000 characters long' })
    content!: string;
}
