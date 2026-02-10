
import { IsString, IsInt, IsArray } from 'class-validator';

export default class UpdateAuctioneerDTO {
	@IsString()
	name: string;
	
	@IsArray()
	@IsString({ each: true })
	email: string[];

	@IsArray()
	@IsString({ each: true })
	url: string[];
}
