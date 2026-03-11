import { PublisherCode } from "@domain/value-object/publisher-code";
import { PublisherName } from "@domain/value-object/publisher-name";

interface PublisherProps {
  code: PublisherCode;
  name: PublisherName;
  persistenceId?: number;
}

export class Publisher {
  private readonly _code: PublisherCode;
  private readonly _name: PublisherName;
  private readonly _persistenceId: number | null;

  protected constructor(props: PublisherProps) {
    this._code = props.code;
    this._name = props.name;
    this._persistenceId = props.persistenceId || null;
  }

  static create(props: PublisherProps): Publisher {
    return new Publisher(props);
  }

  get code(): PublisherCode {
    return this._code;
  }

  get name(): PublisherName {
    return this._name;
  }

  get persistenceId(): number | null {
    return this._persistenceId;
  }
}
