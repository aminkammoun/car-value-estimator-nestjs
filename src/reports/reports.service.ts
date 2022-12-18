import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reports } from './entities/reports.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportsDto } from './dto/create-reports.dto';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo: Repository<Reports>) { }
    create(createReportsCrudDto: CreateReportsDto, user: User[]) {
        console.log(createReportsCrudDto)
        const report = this.repo.create(createReportsCrudDto)
        report.users = user
        return this.repo.save(report);
    }

    findAll() {
        return this.repo.find();;
    }

    findOne(id: number) {
        if (!id) {
            console.log("no ID")
            return null
        }
        return this.repo.findOneBy({ id })
    }

    async update(id: number, attrs: Partial<Reports>) {
        let report = await this.findOne(id)
        if (!report) {
            throw new NotFoundException("no useer to update");
        }
        report = Object.assign(report, attrs);
        return this.repo.save(report)
    }

    async remove(id: number) {
        const report = await this.findOne(id)
        if (!report) {
            throw new NotFoundException("no useer to remove");
        }
        return this.repo.remove(report)
    }
}
