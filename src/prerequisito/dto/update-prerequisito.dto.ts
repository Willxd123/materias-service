import { PartialType } from '@nestjs/swagger';
import { CreatePrerequisitoDto } from './create-prerequisito.dto';

export class UpdatePrerequisitoDto extends PartialType(CreatePrerequisitoDto) {}
