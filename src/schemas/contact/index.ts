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
import { Contact } from './Contact'
import { Context } from '../../config/context'
import SearchInput from '../common/SearchInput'
import { AuthenticationError } from 'apollo-server-express'
import sendEmail from '../../helpers/sendEmail'

@InputType()
class ContactInput {
	@Field(() => Int, { nullable: true })
	id?: number

	@Field()
	fullname: string

	@Field()
	email: string

	@Field()
	cellphone: string

	@Field()
	city: string

	@Field()
	state: string

	@Field()
	message: string

	@Field(() => GraphQLTimestamp, { nullable: true })
	createdAt?: Date

	@Field(() => GraphQLTimestamp, { nullable: true })
	updatedAt?: Date | null
}

@Resolver(Contact)
export class ContactResolver {

	@Mutation(() => Contact)
	async addContact(
		@Arg('data') data: ContactInput,
		@Ctx() ctx: Context
	): Promise<Contact> {
		const result = await ctx.prisma.contact.create({
			data: {
				fullname: data.fullname,
				email: data.email,
				cellphone: data.cellphone,
				city: data.city,
				state: data.state,
				message: data.message,
				createdAt: data.createdAt,
			},
		})

		const emailDefaultTo = process.env.SMTP_DEFAULT_EMAIL_TO || ""

		if (result && result.id > 0) {
			await sendEmail(
				`Solicitação de Contato`,
				`
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#ffffff" id="bodyTable">
					<tbody>
						<tr>
							<td style="font-size:1px;line-height:1px" height="40">&nbsp;</td>
						</tr>
						<tr>
							<td align="center">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
									<tbody>
										<tr>
											<td align="center" valign="top">
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
													<tbody>
														<tr>
															<td style="background-color:#00bdb6;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
														</tr>
														<tr>
															<td style="font-size:1px;line-height:1px" height="40">&nbsp;</td>
														</tr>
														<tr>
															<td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
																<h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Solicitação de Contato</h2>
															</td>
														</tr>
														<tr>
															<td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
														</tr>
														<tr>
															<td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
																<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
																	<tbody>
																		<tr>
																			<td style="padding-bottom: 20px;" align="left" valign="top" class="description">
																				
																				<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:left;padding:0;margin:0">
																					<strong>Nome :</strong> ${data.fullname}, <br/>
																					<strong>Email :</strong> ${data.email}, <br/>
																					<strong>Celular :</strong> ${data.cellphone}, <br/>
																					<strong>Cidade :</strong> ${data.city}, <br/>
																					<strong>Estado :</strong> ${data.state}, <br/>
																					<strong>Mensagem :</strong> ${data.message}
																				</p>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
														<tr>
															<td style="font-size:1px;line-height:1px" height="40">&nbsp;</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
						
							</td>
						</tr>
						<tr>
							<td style="font-size:1px;line-height:1px" height="40">&nbsp;</td>
						</tr>
					</tbody>
				</table>
				`,
				[emailDefaultTo]
			)
		}

		return result
	}

	@Mutation(() => Contact)
	async updateContact(
		@Arg('data') data: ContactInput,
		@Ctx() ctx: Context
	): Promise<Contact> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.contact.update({
			data: {
				fullname: data.fullname,
				email: data.email,
				cellphone: data.cellphone,
				city: data.city,
				state: data.state,
				message: data.message,
				updatedAt: data.updatedAt,
			},
			where: {
				id: data.id,
			},
		})
	}

	@Mutation(() => Contact)
	async removeContact(
		@Arg('id', () => Int) id: number,
		@Ctx() ctx: Context
	): Promise<Contact> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.contact.delete({
			where: {
				id,
			},
		})
	}

	@Query(() => Contact, { nullable: true })
	async contact(
		@Arg('id', () => Int) id: number,
		@Ctx() ctx: Context
	): Promise<Contact | null> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.contact.findUnique({
			where: { id: id },
		})
	}

	@Query(() => [Contact], { nullable: true })
	async contacts(
		@Arg('params') params: SearchInput,
		@Ctx() ctx: Context
	): Promise<Contact[]> {
		if (!ctx.user)
			throw new AuthenticationError(
				'Usuário não logado para realizar a operação solicitada!'
			)

		return ctx.prisma.contact.findMany({
			skip: params.skip,
			take: params.take,
			where: {
				fullname: {
					contains: params.term,
				},
			},
		})
	}
}
