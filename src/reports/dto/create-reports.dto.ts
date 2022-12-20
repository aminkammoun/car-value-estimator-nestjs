import { IsString, IsEmail, IsNumber,Min,Max } from "class-validator"

export class CreateReportsDto {
    @IsNumber()
    price: number;
    @IsString()
    make: string;
    @IsString()
    model: string;
    @IsNumber()
    @Min(1950)
    @Max(2050)
    year: number;
    @IsNumber()
    lng: number;
    @IsNumber()
    lat: number;
    @IsNumber()
    @Min(0)
    @Max(100000000)
    mileage: number;
}