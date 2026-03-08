import { Injectable } from '@nestjs/common';
import CreateAuctioneerDTO from '../dto/createAuctioneerDTO';
import { Auctioneer } from '../Auctioneer';
import { randomUUID } from 'crypto';
import { Phone } from '../vo/Phone.vo';
import { Url } from 'src/auction/Url.vo';
import { Email } from '../vo/Email.vo';
import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';

@Injectable()
export default class CreateAuctioneerService {
  constructor(private readonly auctioneerRepository: IAuctioneerRepository) {}

  async execute(data: CreateAuctioneerDTO) {
    const auctioneer = Auctioneer.create({
      emails: data.email.map((email) => Email.create(email)),
      id: randomUUID(),
      name: data.name,
      phones: data.phones.map((phone) => Phone.create(phone)),
      urls: data.url.map((url) => Url.create(url)),
    });

    await this.auctioneerRepository.create(auctioneer);
  }
}
