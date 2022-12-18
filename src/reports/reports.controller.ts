import { Controller, Post, Body, Param, Get, Patch, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportsDto } from './dto/create-reports.dto';
import { UpdateDto } from './dto/reports-update.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity'
import { Serialize } from '../interceptors/serialize.interceptor'
import { ReportsInterDto } from './dto/reports-inter.dto';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Post('/create')
    @Serialize(ReportsInterDto)
    create(@Body() body: CreateReportsDto, @CurrentUser() user: User[]) {
        const report = this.reportsService.create(body, user)
        return report
    }
    @Get('/')
    findAll() {
        return this.reportsService.findAll()
    }
    @Get(':id')

    findOne(@Param('id') id: number) {
        return this.reportsService.findOne(id)
    }
    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdateDto) {
        return this.reportsService.update(id, body)
    }
}
