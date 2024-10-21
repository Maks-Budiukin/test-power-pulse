import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LookupService } from './lookup.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateLookupDto } from './dto/create-lookup.dto';

@Controller('lookups')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Get('')
  @Auth()
  async getAll(@Query() queryParam: CreateLookupDto) {
    return await this.lookupService.getAll(queryParam);
  }

  @Post('import')
  async importLookup(@Body() data: any) {
    return await this.lookupService.importLookup(data);
  }
}
