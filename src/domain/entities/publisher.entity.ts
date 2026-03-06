interface PublisherProps {
  code: string;
  name: string;
  persistenceId?: number;
}

export class Publisher {
  private readonly _code: string;
  private readonly _name: string;
  private readonly _persistenceId: number | null;

  protected constructor(props: PublisherProps) {
    this._code = props.code;
    this._name = props.name;
    this._persistenceId = props.persistenceId || null;
  }

  static create(props: PublisherProps): Publisher {
    if (!this.validateCode(props.code)) {
      throw new Error(
        "Invalid publisher code. Format must be PB followed by 8 digits (e.g., PB00000001)",
      );
    }

    return new Publisher({
      ...props,
      name: this.normalizeName(props.name),
    });
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get persistenceId(): number | null {
    return this._persistenceId;
  }

  private static codePattern = /^PB\d{6}$/;

  private static validateCode(code: string): boolean {
    if (Publisher.codePattern.test(code)) {
      return true;
    }
    return false;
  }

  private static normalizeName(name: string): string {
    return name.toUpperCase();
  }

  static toCode(counter: number): string {
    if (!Number.isInteger(counter) && counter > -1) {
      throw new Error("Counter must be an non-negative integer");
    }
    if (counter < 0) {
      throw new Error("Counter must be non-negative");
    }
    if (counter > 999999) {
      throw new Error("Counter must not exceed 6 digits (maximum: 999999)");
    }

    const publisherCode = `PB${counter.toString().padStart(6, "0")}`;
    if (!this.validateCode(publisherCode)) {
      throw new Error(
        "Invalid publisher code. Format must be PB followed by 6 digits (e.g., PB000001)",
      );
    }

    return publisherCode;
  }
}
