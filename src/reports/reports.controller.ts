import { Controller, Post, Body, Param, Get, Patch, NotFoundException, Session, UseGuards, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportsDto } from './dto/create-reports.dto';
import { UpdateDto } from './dto/reports-update.dto';
import { ApproveDto } from './dto/approve-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity'
import { Serialize } from '../interceptors/serialize.interceptor'
import { ReportsInterDto } from './dto/reports-inter.dto';
import { GetEstimateReportsDto } from './dto/getEstimateReport.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { AdminGuard } from 'src/guards/admin.guards';
@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get()
    getEstimatedReport(@Query() query: GetEstimateReportsDto){
       return this.reportsService.getEstimateReport(query)
    }

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
    @UseGuards(AdminGuard)
    update(@Param('id') id: number, @Body() body: ApproveDto) {
        return this.reportsService.update(id, body)
    }
}
