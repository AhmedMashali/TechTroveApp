import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetArticleListDto {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: 'page must be a number' })
    @Min(1, { message: 'page must be at least 1' })
    page!: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: 'limit must be a number' })
    @Min(1, { message: 'limit must be at least 1' })
    @Max(20, { message: 'limit must not be greater than 20' })
    limit!: number;
}
