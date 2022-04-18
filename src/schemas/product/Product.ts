import 'reflect-metadata'
import { ObjectType, Field, ID, GraphQLTimestamp } from 'type-graphql'
import { Media } from '../media/Media'
import { User } from '../user/User'
import { ProductLine } from '../product-line/Product-line'

@ObjectType()
export class Product {
	@Field(() => ID)
	id: number

	@Field(() => ID)
	productLine_id: number

	@Field(() => ID)
	media_id: number

	@Field()
	title: string
	
	@Field()
	unitWeight: string

	@Field()
	description: string

	@Field()
	preparation: string

	@Field()
	ingredient: string

	@Field()
	nutritional: string

	@Field()
	friendlyUrl: string

	@Field()
	available: boolean

	@Field(() => ID, { nullable: true })
	userCreatedId?: number | null

	@Field(() => GraphQLTimestamp)
	createdAt: Date

	@Field(() => ID, { nullable: true })
	userUpdatedId?: number | null

	@Field(() => GraphQLTimestamp, { nullable: true })
	updatedAt?: Date | null

	@Field(() => User, { nullable: true })
	createdBy?: User | null

	@Field(() => User, { nullable: true })
	updatedBy?: User | null

	@Field(() => Media, { nullable: true })
	media?: Media | null

	@Field(() => ProductLine, { nullable: true })
	productLine?: ProductLine | null
}
