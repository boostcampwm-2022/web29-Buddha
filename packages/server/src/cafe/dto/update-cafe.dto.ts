import { PartialType } from '@nestjs/mapped-types';
import { CreateCafeDto } from './create-cafe.dto';

export class UpdateCafeDto extends PartialType(CreateCafeDto) {}
