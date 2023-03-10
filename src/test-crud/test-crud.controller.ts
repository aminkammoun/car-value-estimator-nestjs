import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestCrudService } from './test-crud.service';
import { CreateTestCrudDto } from './dto/create-test-crud.dto';
import { UpdateTestCrudDto } from './dto/update-test-crud.dto';

@Controller('test-crud')
export class TestCrudController {
  constructor(private readonly testCrudService: TestCrudService) {}

  @Post()
  create(@Body() createTestCrudDto: CreateTestCrudDto) {
    return this.testCrudService.create(createTestCrudDto);
  }

  @Get()
  findAll() {
    return this.testCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testCrudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestCrudDto: UpdateTestCrudDto) {
    return this.testCrudService.update(+id, updateTestCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testCrudService.remove(+id);
  }
}
