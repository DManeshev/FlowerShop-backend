import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from '../prisma.service';
import { returnUserObject } from './return-user.object';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    
    async byId(id: number, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                ...returnUserObject,
                ...selectObject
            }
        })

        if (!user) throw new Error('Пользователь не найден')

        return user
    }

    async updateProfile(id: number, dto: UserDto) {
        const isSameUser = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (isSameUser && id !== isSameUser.id)
            throw new BadRequestException('email занят')

        const user = await this.byId(id)

        return this.prisma.user.update({
            where: { id },
            data: {
                email: dto.email,
                name: dto.name,
                avatarPath: dto.avatarPath,
                phone: dto.phone,
                password: dto.password ? await hash(dto.password) : user.password
            }
        })
    }
}
