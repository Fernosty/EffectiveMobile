import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Expose()
export class UpdateUserDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsEmail({}, { message: 'Invalid email' })
    @IsOptional()
    email?: string;
}
