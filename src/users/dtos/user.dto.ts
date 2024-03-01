import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the email user' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the password user' })
  readonly password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the role user' })
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerID: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
