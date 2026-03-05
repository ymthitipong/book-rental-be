interface UserProps {
  dateOfBirth: Date;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  uniqueId: string;
}

export class User {
  private readonly _firstName: string;
  private readonly _middleName: string | null;
  private readonly _lastName: string;
  private readonly _phoneNumber: string;
  private readonly _dateOfBirth: Date;
  private readonly _uniqueId: string;

  private constructor(props: UserProps) {
    this._uniqueId = props.uniqueId;
    this._firstName = props.firstName;
    this._middleName = props.middleName || null;
    this._lastName = props.lastName;
    this._phoneNumber = props.phoneNumber;
    this._dateOfBirth = props.dateOfBirth;
  }

  static create(props: UserProps): User {
    if (!this.validateId(props.uniqueId)) {
      throw new Error(
        "Invalid user ID. Format must be US followed by 6 digits (e.g., US000001)",
      );
    }

    return new User(props);
  }

  get firstName(): string {
    return this._firstName;
  }

  get middleName(): string | null {
    return this._middleName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get phoneNumber(): string | null {
    return this._phoneNumber;
  }

  get dateOfBirth(): Date | null {
    return this._dateOfBirth;
  }

  get unique_id(): string {
    return this._uniqueId;
  }

  private static idPattern = /^US\d{6}$/;

  private static validateId(id: string): boolean {
    if (User.idPattern.test(id)) {
      return true;
    }
    return false;
  }

  static toUserId(counter: number): string {
    if (!Number.isInteger(counter) && counter > -1) {
      throw new Error("Counter must be an non-negative integer");
    }
    if (counter < 0) {
      throw new Error("Counter must be non-negative");
    }
    if (counter > 999999) {
      throw new Error("Counter must not exceed 6 digits (maximum: 999999)");
    }
    return `US${counter.toString().padStart(6, "0")}`;
  }
}
