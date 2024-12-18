import { Injectable } from '@nestjs/common';
import { IUserRepository, UserWithoutPassword } from '../../core/auth/domain/interfaces/types';
import { UserProps } from '../../core/auth/domain/models/user.model';
import { Staff } from '../schemas/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthInfrastructureService implements IUserRepository {
    constructor(
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) {}

    private excludePassword<T extends Staff>(staff: T): Omit<T, 'password'> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...staffWithoutPassword } = staff;
        return staffWithoutPassword;
    }

    private createStaffEntity(userData: UserProps): Staff {
        return this.staffRepository.create({
            dni: userData.dni,
            name: userData.name,
            lastname: userData.lastName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            active: true,
            validateAccount: null,
        });
    }

    async findByEmail(email: string): Promise<UserWithoutPassword | null> {
        const staff = await this.staffRepository.findOne({ where: { email } });
        return staff ? this.excludePassword(staff) : null;
    }

    async findByDni(dni: string): Promise<UserProps | null> {
        const staff = await this.staffRepository.findOne({ where: { dni } });
        if (!staff) return null;
        return staff;
    }

    async create(user: UserProps): Promise<UserProps> {
        const newStaff = this.createStaffEntity(user);
        await this.staffRepository.save(newStaff);
        return newStaff;
    }

    async update(user: UserProps): Promise<UserProps> {
        const existingStaff = await this.staffRepository.findOne({ 
            where: { dni: user.dni } 
        });

        if (!existingStaff) {
            throw new Error('User not found');
        }

        // Update fields
        const updatedStaff = this.staffRepository.merge(existingStaff, {
            name: user.name,
            lastname: user.lastName,
            email: user.email,
            phone: user.phone,
            active: user.active ?? existingStaff.active,
            validateAccount: user.validateAccount ?? existingStaff.validateAccount,
            // Only update password if provided in the update
            ...(user.password && { password: user.password }),
        });

        // Save the updated entity
        const savedStaff = await this.staffRepository.save(updatedStaff);
        return savedStaff;
    }
}
