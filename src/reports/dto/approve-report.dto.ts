import { IsOptional, IsBoolean } from "class-validator"

export class ApproveDto {
   
    @IsBoolean()
    @IsOptional()
    approved: boolean;
}