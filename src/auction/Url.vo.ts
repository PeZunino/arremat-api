import { ValueObject } from 'src/common/valueObject';

export class Url extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
  }

  static create(raw: string): Url {
    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      throw new Error(`URL inválida: "${raw}"`);
    }

    if (!['http:', 'https:'].includes(parsed.protocol))
      throw new Error(`Protocolo não permitido: ${parsed.protocol}`);

    return new Url({ value: parsed.toString() });
  }

  get domain(): string {
    return new URL(this.props.value).hostname;
  }

  get value() {
    return this.props.value;
  }
}
