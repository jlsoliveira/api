import * as tq from 'type-graphql'

import { BannerResolver } from './banner'
import { ContactResolver } from './contact'
import { MediaResolver } from './media'
import { ProductResolver } from './product'
import { ProductLineResolver } from './product-line'
import { UserResolver } from './user'

export const schema = tq.buildSchemaSync({
	resolvers: [
		BannerResolver,
		ContactResolver,
		MediaResolver,
		ProductResolver,
		ProductLineResolver,
		UserResolver,
	],
})
