import { ValueObject } from 'src/common/valueObject';

export class Money extends ValueObject<{ amount: number; currency: string }> {
  private constructor(props: { amount: number; currency: string }) {
    super(props);
  }

  static create(amount: number, currency: string): Money {
    if (amount < 0) throw new Error('Valor não pode ser negativo');
    if (!currency) throw new Error('Moeda obrigatória');
    return new Money({ amount, currency });
  }

  add(other: Money): Money {
    if (other.props.currency !== this.props.currency)
      throw new Error('Moedas diferentes');
    return Money.create(
      this.props.amount + other.props.amount,
      this.props.currency,
    );
  }

  get amount() {
    return this.props.amount;
  }
  get currency() {
    return this.props.currency;
  }
}
