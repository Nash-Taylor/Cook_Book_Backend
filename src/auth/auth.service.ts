import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // First, check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: registerDto.email
      }
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create new user
    const user = await User.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user.id });

    return { token };
  }

  async login(loginDto: LoginDto) {
    // Find user by email
    const user = await User.findOne({
      where: {
        email: loginDto.email
      }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user.id });

    return { token };
  }
} 