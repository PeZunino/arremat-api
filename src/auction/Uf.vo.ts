import { ValueObject } from 'src/common/valueObject';

const UF_LIST = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const;

type UFCode = (typeof UF_LIST)[number];

export class UF extends ValueObject<{ value: UFCode }> {
  private constructor(props: { value: UFCode }) {
    super(props);
  }

  static create(raw: string): UF {
    const upper = raw.trim().toUpperCase() as UFCode;

    if (!UF_LIST.includes(upper)) throw new Error(`UF inválida: "${raw}"`);

    return new UF({ value: upper });
  }

  get value(): UFCode {
    return this.props.value;
  }
}
