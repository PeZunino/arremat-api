
import { IsString, IsInt, IsArray } from 'class-validator';

export default class UpdateAuctioneerDTO {
	@IsString()
	name: string;

	@IsString()
	email: string;

	@IsArray()
	@IsString({ each: true })
	url: string[];
}
