import 'reflect-metadata'
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	Ctx,
	FieldResolver,
	Root,
	InputType,
	Field,
	GraphQLTimestamp,
	Int,
} from 'type-graphql'
import slugify from 'slugify'
import { Config } from '../../config/slugifyConfig'
import { User } from '../user/User'
import { ProductLine } from './Product-line'
import { Context } from '../../config/context'
import SearchInput from '../common/SearchInput'
import { Media } from '../media/Media'
import { AuthenticationError } from 'apollo-server-express'

@InputType()
class ProductLineInput {
	@Field(() => Int, { nullable: true })
	id?: number

	@Field(() => Int)
	media_id: number

	@Field()
	title: string

	@Field()
	description: string

	@Field({ defaultValue: true })
	available: boolean

	@Field(() => Int, { nullable: true })
	userCreatedId?: number | null

	@Field(() => GraphQLTimestamp, { nullable: true })
	createdAt?: Date

	@Field(() => Int, { nullable: true })
	userUpdatedId?: number | null

	@Field(() => GraphQLTimestamp, { nullable: true })
	updatedAt?: Date | null
}

@Resolver(ProductLine)
export class ProductLineResolver {
	@FieldResolver()
	async media(
		@Root() productLine: ProductLine,
		@Ctx() ctx: Context
	): Promise<Media | null> {
		return ctx.prisma.productLine
			.findUnique({
				where: {
					id: productLine.id,
				},
			})
			.media()
	}

	@FieldResolver()
	async createdBy(
		@Root() productLine: ProductLine,
		@Ctx() ctx: Context
	): Promise<User | null> {
		return ctx.prisma.productLine
			.findUnique({
				where: {
					id: productLine.id,
				},
			})
			.createdBy()
	}

	@FieldResolver()
	async updatedBy(
		@Root() productLine: ProductLine,
		@Ctx() ctx: Context
	): Promise<User | null> {
		return ctx.prisma.productLine
			.findUnique({
				where: {
					id: productLine.id,
				},
			})
			.updatedBy()
	}

	@Mutation(() => ProductLine)
	async addProductLine(
		@Arg('data') data: ProductLineInput,
		@Ctx() ctx: Context
	): Promise<ProductLine> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.productLine.create({
			data: {
				title: data.title,
				description: data.description,
				friendlyUrl: slugify(data.title, Config as any),
				available: data.available,
				createdBy: {
					connect: {
						id: data.userCreatedId
							? data.userCreatedId
							: ctx.user.id,
					},
				},
				media: {
					connect: {
						id: data.media_id,
					},
				},
				createdAt: data.createdAt,
			},
		})
	}

	@Mutation(() => ProductLine)
	async updateProductLine(
		@Arg('data') data: ProductLineInput,
		@Ctx() ctx: Context
	): Promise<ProductLine> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.productLine.update({
			data: {
				title: data.title,
				description: data.description,
				friendlyUrl: slugify(data.title, Config as any),
				available: data.available,
				updatedBy: {
					connect: {
						id: data.userUpdatedId
							? data.userUpdatedId
							: ctx.user.id,
					},
				},
				media: {
					connect: {
						id: data.media_id,
					},
				},
				updatedAt: data.updatedAt,
			},
			where: {
				id: data.id,
			},
		})
	}

	@Mutation(() => ProductLine)
	async removeProductLine(
		@Arg('id', () => Int) id: number,
		@Ctx() ctx: Context
	): Promise<ProductLine> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.productLine.delete({
			where: {
				id,
			},
		})
	}

	@Query(() => ProductLine, { nullable: true })
	async productLine(
		@Arg('id', () => Int) id: number,
		@Ctx() ctx: Context
	): Promise<ProductLine | null> {
		return ctx.prisma.productLine.findUnique({
			where: { id: id },
		})
	}

	@Query(() => [ProductLine], { nullable: true })
	async productLines(
		@Arg('params') params: SearchInput,
		@Ctx() ctx: Context
	): Promise<ProductLine[]> {
		if (!params.skip && !params.take)
			return ctx.prisma.productLine.findMany({
				where: {
					title: {
						contains: params.term,
					},
					available: {
						equals: params.available,
					},
				},
			})

		return ctx.prisma.productLine.findMany({
			skip: params.skip,
			take: params.take,
			where: {
				title: {
					contains: params.term,
				},
				available: {
					equals: params.available,
				},
			},
		})
	}
}
