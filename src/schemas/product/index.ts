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
import { User } from '../user/User'
import { Product } from './Product'
import { ProductLine } from '../product-line/Product-line'
import { Context } from '../../config/context'
import SearchInput from '../common/SearchInput'
import { Media } from '../media/Media'
import { AuthenticationError } from 'apollo-server-express'
import slugify from 'slugify'
import { Config } from '../../config/slugifyConfig'

@InputType()
class CustomSearchInput extends SearchInput {
	@Field({ nullable: true })
	productLineFriendlyUrl?: string
}

@InputType()
class ProductInput {
	@Field(() => Int, { nullable: true })
	id?: number

	@Field(() => Int)
	productLine_id: number

	@Field(() => Int)
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
	available: boolean

	@Field(() => Int, { nullable: true })
	userCreatedId?: number | null

	@Field(() => GraphQLTimestamp, { nullable: true })
	createdAt?: Date

	@Field(() => Int, { nullable: true })
	userUpdatedId?: number | null

	@Field(() => GraphQLTimestamp, { nullable: true })
	updatedAt?: Date
}

@Resolver(Product)
export class ProductResolver {

	@FieldResolver()
	async productLine(
		@Root() product: Product,
		@Ctx() ctx: Context
	): Promise<ProductLine | null> {
		return ctx.prisma.product
			.findUnique({
				where: {
					id: product.id,
				},
			})
			.productLine()
	}


	@FieldResolver()
	async media(
		@Root() product: Product,
		@Ctx() ctx: Context
	): Promise<Media | null> {
		return ctx.prisma.product
			.findUnique({
				where: {
					id: product.id,
				},
			})
			.media()
	}

	@FieldResolver()
	async createdBy(
		@Root() product: Product,
		@Ctx() ctx: Context
	): Promise<User | null> {
		return ctx.prisma.product
			.findUnique({
				where: {
					id: product.id,
				},
			})
			.createdBy()
	}

	@FieldResolver()
	async updatedBy(
		@Root() product: Product,
		@Ctx() ctx: Context
	): Promise<User | null> {
		return ctx.prisma.product
			.findUnique({
				where: {
					id: product.id,
				},
			})
			.updatedBy()
	}

	@Mutation(() => Product)
	async addProduct(
		@Arg('data') data: ProductInput,
		@Ctx() ctx: Context
	): Promise<Product> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.product.create({
			data: {
				title: data.title,
				unitWeight: data.unitWeight,
				description: data.description,
				preparation: data.preparation,
				ingredient: data.ingredient,
				nutritional: data.nutritional,
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
				productLine: {
					connect: {
						id: data.productLine_id,
					},
				},
				createdAt: data.createdAt,
			},
		})
	}

	@Mutation(() => Product)
	async updateProduct(
		@Arg('data') data: ProductInput,
		@Ctx() ctx: Context
	): Promise<Product> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.product.update({
			data: {
				title: data.title,
				unitWeight: data.unitWeight,
				description: data.description,
				preparation: data.preparation,
				ingredient: data.ingredient,
				nutritional: data.nutritional,
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
				productLine: {
					connect: {
						id: data.productLine_id,
					},
				},
				updatedAt: data.updatedAt,
			},
			where: {
				id: data.id,
			},
		})
	}

	@Mutation(() => Product)
	async removeProduct(
		@Arg('id', () => Int) id: number,
		@Ctx() ctx: Context
	): Promise<Product> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.product.delete({
			where: {
				id,
			},
		})
	}

	@Query(() => Product, { nullable: true })
	async product(
		@Arg('friendlyUrl', () => String) friendlyUrl: string,
		@Ctx() ctx: Context
	): Promise<Product | null> {
		return ctx.prisma.product.findFirst({
			where: { friendlyUrl: friendlyUrl },
		})
	}

	@Query(() => [Product], { nullable: true })
	async products(
		@Arg('params') params: CustomSearchInput,
		@Ctx() ctx: Context
	): Promise<Product[]> {
		if (params.productLineFriendlyUrl) {
			const productLine = await ctx.prisma.productLine.findFirst({
				where: {
					friendlyUrl: {
						equals: params.productLineFriendlyUrl
					}
				}
			})

			return ctx.prisma.product.findMany({
				where: {
					productLine_id: {
						equals: productLine?.id,
					},
					available: {
						equals: params.available,
					},
				},
			})
		}

		return ctx.prisma.product.findMany({
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
