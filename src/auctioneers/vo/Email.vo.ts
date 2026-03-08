import { ValueObject } from 'src/common/valueObject';

export class Email extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
  }

  static create(email: string): Email {
    if (!email.includes('@')) throw new Error('Email inválido');
    return new Email({ value: email.toLowerCase().trim() });
  }

  get value() {
    return this.props.value;
  }
}
