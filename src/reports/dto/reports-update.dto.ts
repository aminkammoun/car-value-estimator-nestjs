import { IsString, IsOptional, IsNumber } from "class-validator"

export class UpdateDto {
    @IsNumber()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    make: string;

    @IsString()
    @IsOptional()
    model: string;

    @IsNumber()
    @IsOptional()
    year: number;

    @IsNumber()
    @IsOptional()
    lng: number;

    @IsNumber()
    @IsOptional()
    lat: number;
    
    @IsNumber()
    @IsOptional()
    mileage: number;
}