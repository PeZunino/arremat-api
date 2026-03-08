import { ValueObject } from 'src/common/valueObject';

export class Phone extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
  }

  // Aceita: (47) 99999-0000 | 47999990000 | +5547999990000
  static create(raw: string): Phone {
    const cleaned = raw.replace(/\D/g, '');

    // Remove DDI 55 se presente
    const normalized =
      cleaned.startsWith('55') && cleaned.length > 11
        ? cleaned.slice(2)
        : cleaned;

    if (normalized.length < 10 || normalized.length > 11)
      throw new Error(`Telefone inválido: "${raw}"`);

    const ddd = Number(normalized.slice(0, 2));
    if (ddd < 11 || ddd > 99) throw new Error(`DDD inválido: ${ddd}`);

    return new Phone({ value: normalized });
  }

  isMobile(): boolean {
    // Celular: 9 dígitos começando com 9
    return this.props.value.length === 11 && this.props.value[2] === '9';
  }

  formatted(): string {
    const v = this.props.value;
    if (v.length === 11)
      return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  }

  get value() {
    return this.props.value;
  }
}

// Uso
const p = Phone.create('(47) 99999-0000');
p.formatted(); // "(47) 99999-0000"
p.isMobile(); // true
