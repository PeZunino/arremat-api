import { Url } from 'src/auction/Url.vo';
import { Email } from './vo/Email.vo';
import { Phone } from './vo/Phone.vo';

export class Auctioneer {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly emails: Email[],
    public readonly phones: Phone[],
    public readonly urls: Url[],
  ) {}

  static create(props: {
    id: string;
    name: string;
    emails: Email[];
    phones: Phone[];
    urls: Url[];
  }): Auctioneer {
    if (props.emails.length === 0)
      throw new Error('Auctioneer deve ter ao menos um email');

    return new Auctioneer(
      props.id,
      props.name,
      props.emails,
      props.phones,
      props.urls,
    );
  }
}
