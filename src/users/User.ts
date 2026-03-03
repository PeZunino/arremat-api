import { randomUUID } from 'crypto';
import { CreateUserDTO } from './interfaces/createUserDTO';
import { Role } from './interfaces/Role.enum';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: Role;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string | null;
}

export class User {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: Role;
  private _active: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _refreshToken: string | null;

  constructor(props: UserProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role ?? Role.USER;
    this._active = props.active ?? true;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._refreshToken = props.refreshToken ?? null;

    this.validate();
  }

  // --- Getters ---

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get role(): Role {
    return this._role;
  }
  get active(): boolean {
    return this._active;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get refreshToken(): string | null {
    return this._refreshToken;
  }

  // --- Behaviors ---

  updateName(name: string): void {
    this._name = name;
    this.touch();
  }

  updateEmail(email: string): void {
    this._email = email;
    this.touch();
  }

  updatePassword(hashedPassword: string): void {
    this._password = hashedPassword;
    this.touch();
  }

  setRefreshToken(token: string | null): void {
    this._refreshToken = token;
    this.touch();
  }

  activate(): void {
    this._active = true;
    this.touch();
  }

  deactivate(): void {
    this._active = false;
    this.touch();
  }

  promoteToAdmin(): void {
    this._role = Role.ADMIN;
    this.touch();
  }

  isAdmin(): boolean {
    return this._role === Role.ADMIN;
  }

  // --- Private ---

  private touch(): void {
    this._updatedAt = new Date();
  }

  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('User name is required');
    }

    if (!this._email || !this._email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (!this._password || this._password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  }

  // --- Factory ---

  static create(props: CreateUserDTO): User {
    return new User(props);
  }

  static reconstitute(props: Required<UserProps>): User {
    return new User(props);
  }
}
