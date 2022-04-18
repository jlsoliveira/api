import 'reflect-metadata'
import { Length, IsEmail } from 'class-validator'
import { ObjectType, Field, ID, GraphQLTimestamp } from 'type-graphql'

@ObjectType()
export class Contact {
	@Field(() => ID)
	id: number

	@Field()
	@Length(1, 256)
	fullname: string

	@Field()
	@IsEmail()
	@Length(1, 256)
	email: string

	@Field()
	@Length(1, 50)
	cellphone: string

	@Field()
	@Length(1, 256)
	city: string

	@Field()
	@Length(1, 256)
	state: string

	@Field()
	@Length(1, 4000)
	message: string

	@Field(() => GraphQLTimestamp)
	createdAt: Date

	@Field(() => GraphQLTimestamp, { nullable: true })
	updatedAt?: Date | null

}
