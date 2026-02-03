import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','image','emailVerified','role','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const AuthenticatorScalarFieldEnumSchema = z.enum(['credentialID','userId','providerAccountId','credentialPublicKey','counter','credentialDeviceType','credentialBackedUp','transports']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','slug','content','excerpt','coverImage','status','publishedAt','createdAt','updatedAt','authorId']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','createdAt','updatedAt','postId','authorId']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','slug']);

export const PostTagScalarFieldEnumSchema = z.enum(['postId','tagId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ADMIN','USER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const PostStatusSchema = z.enum(['DRAFT','PUBLISHED','ARCHIVED']);

export type PostStatusType = `${z.infer<typeof PostStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.cuid(),
  email: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// AUTHENTICATOR SCHEMA
/////////////////////////////////////////

export const AuthenticatorSchema = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().nullable(),
})

export type Authenticator = z.infer<typeof AuthenticatorSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  status: PostStatusSchema,
  id: z.cuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  coverImage: z.string().nullable(),
  publishedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authorId: z.string(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.cuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  postId: z.string(),
  authorId: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.cuid(),
  name: z.string(),
  slug: z.string(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// POST TAG SCHEMA
/////////////////////////////////////////

export const PostTagSchema = z.object({
  postId: z.string(),
  tagId: z.string(),
})

export type PostTag = z.infer<typeof PostTagSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  authenticators: z.union([z.boolean(),z.lazy(() => AuthenticatorFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  authenticators: z.boolean().optional(),
  accounts: z.boolean().optional(),
  posts: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authenticators: z.union([z.boolean(),z.lazy(() => AuthenticatorFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// AUTHENTICATOR
//------------------------------------------------------

export const AuthenticatorIncludeSchema: z.ZodType<Prisma.AuthenticatorInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AuthenticatorArgsSchema: z.ZodType<Prisma.AuthenticatorDefaultArgs> = z.object({
  select: z.lazy(() => AuthenticatorSelectSchema).optional(),
  include: z.lazy(() => AuthenticatorIncludeSchema).optional(),
}).strict();

export const AuthenticatorSelectSchema: z.ZodType<Prisma.AuthenticatorSelect> = z.object({
  credentialID: z.boolean().optional(),
  userId: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  credentialPublicKey: z.boolean().optional(),
  counter: z.boolean().optional(),
  credentialDeviceType: z.boolean().optional(),
  credentialBackedUp: z.boolean().optional(),
  transports: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  content: z.boolean().optional(),
  excerpt: z.boolean().optional(),
  coverImage: z.boolean().optional(),
  status: z.boolean().optional(),
  publishedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  postId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST TAG
//------------------------------------------------------

export const PostTagIncludeSchema: z.ZodType<Prisma.PostTagInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict();

export const PostTagArgsSchema: z.ZodType<Prisma.PostTagDefaultArgs> = z.object({
  select: z.lazy(() => PostTagSelectSchema).optional(),
  include: z.lazy(() => PostTagIncludeSchema).optional(),
}).strict();

export const PostTagSelectSchema: z.ZodType<Prisma.PostTagSelect> = z.object({
  postId: z.boolean().optional(),
  tagId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  authenticators: z.lazy(() => AuthenticatorListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authenticators: z.lazy(() => AuthenticatorOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  authenticators: z.lazy(() => AuthenticatorListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
});

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const AuthenticatorWhereInputSchema: z.ZodType<Prisma.AuthenticatorWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuthenticatorWhereInputSchema), z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorWhereInputSchema), z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AuthenticatorOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthenticatorOrderByWithRelationInput> = z.strictObject({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AuthenticatorWhereUniqueInputSchema: z.ZodType<Prisma.AuthenticatorWhereUniqueInput> = z.union([
  z.object({
    userId_credentialID: z.lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema),
    credentialID: z.string(),
  }),
  z.object({
    userId_credentialID: z.lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema),
  }),
  z.object({
    credentialID: z.string(),
  }),
])
.and(z.strictObject({
  credentialID: z.string().optional(),
  userId_credentialID: z.lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AuthenticatorWhereInputSchema), z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorWhereInputSchema), z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AuthenticatorOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthenticatorOrderByWithAggregationInput> = z.strictObject({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AuthenticatorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AuthenticatorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthenticatorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthenticatorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AuthenticatorSumOrderByAggregateInputSchema).optional(),
});

export const AuthenticatorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthenticatorScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema), z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema), z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PostWhereInputSchema), z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema), z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  excerpt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  coverImage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPostStatusFilterSchema), z.lazy(() => PostStatusSchema) ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  tags: z.lazy(() => PostTagListRelationFilterSchema).optional(),
});

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  excerpt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  coverImage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => PostTagOrderByRelationAggregateInputSchema).optional(),
});

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.strictObject({
  id: z.cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema), z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema), z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  excerpt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  coverImage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPostStatusFilterSchema), z.lazy(() => PostStatusSchema) ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  tags: z.lazy(() => PostTagListRelationFilterSchema).optional(),
}));

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  excerpt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  coverImage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
});

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema), z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema), z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  excerpt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  coverImage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPostStatusWithAggregatesFilterSchema), z.lazy(() => PostStatusSchema) ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema), z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema), z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostScalarRelationFilterSchema), z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.strictObject({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema), z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema), z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostScalarRelationFilterSchema), z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional(),
});

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema), z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema), z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  posts: z.lazy(() => PostTagListRelationFilterSchema).optional(),
});

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostTagOrderByRelationAggregateInputSchema).optional(),
});

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    name: z.string(),
    slug: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
  }),
  z.object({
    id: z.cuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    name: z.string(),
    slug: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.strictObject({
  id: z.cuid().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  posts: z.lazy(() => PostTagListRelationFilterSchema).optional(),
}));

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional(),
});

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema), z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema), z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const PostTagWhereInputSchema: z.ZodType<Prisma.PostTagWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PostTagWhereInputSchema), z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagWhereInputSchema), z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostScalarRelationFilterSchema), z.lazy(() => PostWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema), z.lazy(() => TagWhereInputSchema) ]).optional(),
});

export const PostTagOrderByWithRelationInputSchema: z.ZodType<Prisma.PostTagOrderByWithRelationInput> = z.strictObject({
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
});

export const PostTagWhereUniqueInputSchema: z.ZodType<Prisma.PostTagWhereUniqueInput> = z.object({
  postId_tagId: z.lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema),
})
.and(z.strictObject({
  postId_tagId: z.lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PostTagWhereInputSchema), z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagWhereInputSchema), z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostScalarRelationFilterSchema), z.lazy(() => PostWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema), z.lazy(() => TagWhereInputSchema) ]).optional(),
}));

export const PostTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostTagOrderByWithAggregationInput> = z.strictObject({
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostTagMinOrderByAggregateInputSchema).optional(),
});

export const PostTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostTagScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema), z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema), z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
});

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
});

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AuthenticatorCreateInputSchema: z.ZodType<Prisma.AuthenticatorCreateInput> = z.strictObject({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthenticatorsInputSchema),
});

export const AuthenticatorUncheckedCreateInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateInput> = z.strictObject({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
});

export const AuthenticatorUpdateInputSchema: z.ZodType<Prisma.AuthenticatorUpdateInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuthenticatorsNestedInputSchema).optional(),
});

export const AuthenticatorUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AuthenticatorCreateManyInputSchema: z.ZodType<Prisma.AuthenticatorCreateManyInput> = z.strictObject({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
});

export const AuthenticatorUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyMutationInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AuthenticatorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
});

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
});

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postId: z.string(),
  authorId: z.string(),
});

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
});

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postId: z.string(),
  authorId: z.string(),
});

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  name: z.string(),
  slug: z.string(),
  posts: z.lazy(() => PostTagCreateNestedManyWithoutTagInputSchema).optional(),
});

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  name: z.string(),
  slug: z.string(),
  posts: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutTagInputSchema).optional(),
});

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostTagUpdateManyWithoutTagNestedInputSchema).optional(),
});

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional(),
});

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  name: z.string(),
  slug: z.string(),
});

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostTagCreateInputSchema: z.ZodType<Prisma.PostTagCreateInput> = z.strictObject({
  post: z.lazy(() => PostCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => TagCreateNestedOneWithoutPostsInputSchema),
});

export const PostTagUncheckedCreateInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateInput> = z.strictObject({
  postId: z.string(),
  tagId: z.string(),
});

export const PostTagUpdateInputSchema: z.ZodType<Prisma.PostTagUpdateInput> = z.strictObject({
  post: z.lazy(() => PostUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
});

export const PostTagUncheckedUpdateInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateInput> = z.strictObject({
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostTagCreateManyInputSchema: z.ZodType<Prisma.PostTagCreateManyInput> = z.strictObject({
  postId: z.string(),
  tagId: z.string(),
});

export const PostTagUpdateManyMutationInputSchema: z.ZodType<Prisma.PostTagUpdateManyMutationInput> = z.strictObject({
});

export const PostTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyInput> = z.strictObject({
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const AuthenticatorListRelationFilterSchema: z.ZodType<Prisma.AuthenticatorListRelationFilter> = z.strictObject({
  every: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
  some: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
  none: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
});

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.strictObject({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional(),
});

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.strictObject({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional(),
});

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.strictObject({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const AuthenticatorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuthenticatorOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.strictObject({
  provider: z.string(),
  providerAccountId: z.string(),
});

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.strictObject({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.strictObject({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
});

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema: z.ZodType<Prisma.AuthenticatorUserIdCredentialIDCompoundUniqueInput> = z.strictObject({
  userId: z.string(),
  credentialID: z.string(),
});

export const AuthenticatorCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorCountOrderByAggregateInput> = z.strictObject({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthenticatorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorAvgOrderByAggregateInput> = z.strictObject({
  counter: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthenticatorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorMaxOrderByAggregateInput> = z.strictObject({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthenticatorMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorMinOrderByAggregateInput> = z.strictObject({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthenticatorSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorSumOrderByAggregateInput> = z.strictObject({
  counter: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const EnumPostStatusFilterSchema: z.ZodType<Prisma.EnumPostStatusFilter> = z.strictObject({
  equals: z.lazy(() => PostStatusSchema).optional(),
  in: z.lazy(() => PostStatusSchema).array().optional(),
  notIn: z.lazy(() => PostStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => NestedEnumPostStatusFilterSchema) ]).optional(),
});

export const PostTagListRelationFilterSchema: z.ZodType<Prisma.PostTagListRelationFilter> = z.strictObject({
  every: z.lazy(() => PostTagWhereInputSchema).optional(),
  some: z.lazy(() => PostTagWhereInputSchema).optional(),
  none: z.lazy(() => PostTagWhereInputSchema).optional(),
});

export const PostTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostTagOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  excerpt: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  excerpt: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  excerpt: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumPostStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPostStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => PostStatusSchema).optional(),
  in: z.lazy(() => PostStatusSchema).array().optional(),
  notIn: z.lazy(() => PostStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => NestedEnumPostStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
});

export const PostScalarRelationFilterSchema: z.ZodType<Prisma.PostScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional(),
});

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
});

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
});

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
});

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional(),
});

export const PostTagPostIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.PostTagPostIdTagIdCompoundUniqueInput> = z.strictObject({
  postId: z.string(),
  tagId: z.string(),
});

export const PostTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagCountOrderByAggregateInput> = z.strictObject({
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
});

export const PostTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagMaxOrderByAggregateInput> = z.strictObject({
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
});

export const PostTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagMinOrderByAggregateInput> = z.strictObject({
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthenticatorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
});

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
});

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema), z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
});

export const AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
});

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
});

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema), z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const AuthenticatorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema), z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
});

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
});

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
});

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema), z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema), z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
});

export const AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema), z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema), z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
});

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
});

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
});

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema), z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema), z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema), z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthenticatorsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthenticatorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const UserUpdateOneRequiredWithoutAuthenticatorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthenticatorsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthenticatorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuthenticatorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuthenticatorsInputSchema), z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const CommentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema), z.lazy(() => CommentCreateWithoutPostInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema), z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
});

export const PostTagCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateNestedManyWithoutPostInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema), z.lazy(() => PostTagCreateWithoutPostInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
});

export const CommentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema), z.lazy(() => CommentCreateWithoutPostInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema), z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
});

export const PostTagUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema), z.lazy(() => PostTagCreateWithoutPostInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumPostStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPostStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => PostStatusSchema).optional(),
});

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema), z.lazy(() => UserUpdateWithoutPostsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
});

export const CommentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPostNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema), z.lazy(() => CommentCreateWithoutPostInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema), z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema), z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
});

export const PostTagUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithoutPostNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema), z.lazy(() => PostTagCreateWithoutPostInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema), z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema), z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema), z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema), z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
});

export const CommentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema), z.lazy(() => CommentCreateWithoutPostInputSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema), z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema), z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema), z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
});

export const PostTagUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema), z.lazy(() => PostTagCreateWithoutPostInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema), z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema), z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema), z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema), z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
});

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const PostUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputSchema), z.lazy(() => PostUpdateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema), z.lazy(() => UserUpdateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
});

export const PostTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateNestedManyWithoutTagInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema), z.lazy(() => PostTagCreateWithoutTagInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
});

export const PostTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateNestedManyWithoutTagInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema), z.lazy(() => PostTagCreateWithoutTagInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
});

export const PostTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithoutTagNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema), z.lazy(() => PostTagCreateWithoutTagInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema), z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema), z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema), z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema), z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
});

export const PostTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutTagNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema), z.lazy(() => PostTagCreateWithoutTagInputSchema).array(), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema), z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema), z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema), z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema), z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema), z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema), z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
});

export const PostCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutTagsInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema), z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
});

export const TagCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutPostsInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema), z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
});

export const PostUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutTagsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema), z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutTagsInputSchema), z.lazy(() => PostUpdateWithoutTagsInputSchema), z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
});

export const TagUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutPostsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema), z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutPostsInputSchema), z.lazy(() => TagUpdateWithoutPostsInputSchema), z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedEnumPostStatusFilterSchema: z.ZodType<Prisma.NestedEnumPostStatusFilter> = z.strictObject({
  equals: z.lazy(() => PostStatusSchema).optional(),
  in: z.lazy(() => PostStatusSchema).array().optional(),
  notIn: z.lazy(() => PostStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => NestedEnumPostStatusFilterSchema) ]).optional(),
});

export const NestedEnumPostStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPostStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => PostStatusSchema).optional(),
  in: z.lazy(() => PostStatusSchema).array().optional(),
  notIn: z.lazy(() => PostStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => NestedEnumPostStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
});

export const AuthenticatorCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateWithoutUserInput> = z.strictObject({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
});

export const AuthenticatorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateWithoutUserInput> = z.strictObject({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
});

export const AuthenticatorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema) ]),
});

export const AuthenticatorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AuthenticatorCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AuthenticatorCreateManyUserInputSchema), z.lazy(() => AuthenticatorCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.strictObject({
  id: z.cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema), z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema), z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
});

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postId: z.string(),
});

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CommentCreateManyAuthorInputSchema), z.lazy(() => CommentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuthenticatorUpdateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema) ]),
});

export const AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuthenticatorUpdateWithoutUserInputSchema), z.lazy(() => AuthenticatorUncheckedUpdateWithoutUserInputSchema) ]),
});

export const AuthenticatorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthenticatorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuthenticatorUpdateManyMutationInputSchema), z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const AuthenticatorScalarWhereInputSchema: z.ZodType<Prisma.AuthenticatorScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema), z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema), z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
});

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
});

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema), z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema) ]),
});

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  excerpt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  coverImage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPostStatusFilterSchema), z.lazy(() => PostStatusSchema) ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema), z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
});

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorInputSchema) ]),
});

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema), z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema), z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
});

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
});

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserCreateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuthenticatorsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthenticatorsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthenticatorsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]),
});

export const UserUpsertWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuthenticatorsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuthenticatorsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema) ]),
});

export const UserUpdateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuthenticatorsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthenticatorsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
});

export const CommentCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
});

export const CommentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
});

export const CommentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> = z.strictObject({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
});

export const CommentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CommentCreateManyPostInputSchema), z.lazy(() => CommentCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const PostTagCreateWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateWithoutPostInput> = z.strictObject({
  tag: z.lazy(() => TagCreateNestedOneWithoutPostsInputSchema),
});

export const PostTagUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateWithoutPostInput> = z.strictObject({
  tagId: z.string(),
});

export const PostTagCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateOrConnectWithoutPostInput> = z.strictObject({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema) ]),
});

export const PostTagCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.PostTagCreateManyPostInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => PostTagCreateManyPostInputSchema), z.lazy(() => PostTagCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
});

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const CommentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> = z.strictObject({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema), z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
});

export const CommentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> = z.strictObject({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema), z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
});

export const CommentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> = z.strictObject({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputSchema) ]),
});

export const PostTagUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput> = z.strictObject({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostTagUpdateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema) ]),
});

export const PostTagUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput> = z.strictObject({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateWithoutPostInputSchema), z.lazy(() => PostTagUncheckedUpdateWithoutPostInputSchema) ]),
});

export const PostTagUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithWhereWithoutPostInput> = z.strictObject({
  where: z.lazy(() => PostTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateManyMutationInputSchema), z.lazy(() => PostTagUncheckedUpdateManyWithoutPostInputSchema) ]),
});

export const PostTagScalarWhereInputSchema: z.ZodType<Prisma.PostTagScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PostTagScalarWhereInputSchema), z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagScalarWhereInputSchema), z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.strictObject({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
});

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.strictObject({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
});

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional(),
});

export const PostUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> = z.strictObject({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema), z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
});

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
});

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const PostTagCreateWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateWithoutTagInput> = z.strictObject({
  post: z.lazy(() => PostCreateNestedOneWithoutTagsInputSchema),
});

export const PostTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateWithoutTagInput> = z.strictObject({
  postId: z.string(),
});

export const PostTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateOrConnectWithoutTagInput> = z.strictObject({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema) ]),
});

export const PostTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.PostTagCreateManyTagInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => PostTagCreateManyTagInputSchema), z.lazy(() => PostTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const PostTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput> = z.strictObject({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostTagUpdateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema) ]),
});

export const PostTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput> = z.strictObject({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateWithoutTagInputSchema), z.lazy(() => PostTagUncheckedUpdateWithoutTagInputSchema) ]),
});

export const PostTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithWhereWithoutTagInput> = z.strictObject({
  where: z.lazy(() => PostTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateManyMutationInputSchema), z.lazy(() => PostTagUncheckedUpdateManyWithoutTagInputSchema) ]),
});

export const PostCreateWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateWithoutTagsInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutTagsInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
});

export const PostCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutTagsInput> = z.strictObject({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema), z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]),
});

export const TagCreateWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateWithoutPostsInput> = z.strictObject({
  id: z.cuid().optional(),
  name: z.string(),
  slug: z.string(),
});

export const TagUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutPostsInput> = z.strictObject({
  id: z.cuid().optional(),
  name: z.string(),
  slug: z.string(),
});

export const TagCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutPostsInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema), z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]),
});

export const PostUpsertWithoutTagsInputSchema: z.ZodType<Prisma.PostUpsertWithoutTagsInput> = z.strictObject({
  update: z.union([ z.lazy(() => PostUpdateWithoutTagsInputSchema), z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema), z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional(),
});

export const PostUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutTagsInput> = z.strictObject({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutTagsInputSchema), z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema) ]),
});

export const PostUpdateWithoutTagsInputSchema: z.ZodType<Prisma.PostUpdateWithoutTagsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const PostUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutTagsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const TagUpsertWithoutPostsInputSchema: z.ZodType<Prisma.TagUpsertWithoutPostsInput> = z.strictObject({
  update: z.union([ z.lazy(() => TagUpdateWithoutPostsInputSchema), z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema), z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional(),
});

export const TagUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutPostsInput> = z.strictObject({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutPostsInputSchema), z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema) ]),
});

export const TagUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TagUpdateWithoutPostsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutPostsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuthenticatorCreateManyUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateManyUserInput> = z.strictObject({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
});

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.strictObject({
  id: z.cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.strictObject({
  id: z.cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  status: z.lazy(() => PostStatusSchema).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postId: z.string(),
});

export const AuthenticatorUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateWithoutUserInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AuthenticatorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateWithoutUserInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AuthenticatorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
});

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  excerpt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PostStatusSchema), z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
});

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentCreateManyPostInputSchema: z.ZodType<Prisma.CommentCreateManyPostInput> = z.strictObject({
  id: z.cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
});

export const PostTagCreateManyPostInputSchema: z.ZodType<Prisma.PostTagCreateManyPostInput> = z.strictObject({
  tagId: z.string(),
});

export const CommentUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPostInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
});

export const CommentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CommentUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostTagUpdateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateWithoutPostInput> = z.strictObject({
  tag: z.lazy(() => TagUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
});

export const PostTagUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateWithoutPostInput> = z.strictObject({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostTagUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutPostInput> = z.strictObject({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostTagCreateManyTagInputSchema: z.ZodType<Prisma.PostTagCreateManyTagInput> = z.strictObject({
  postId: z.string(),
});

export const PostTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateWithoutTagInput> = z.strictObject({
  post: z.lazy(() => PostUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
});

export const PostTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateWithoutTagInput> = z.strictObject({
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PostTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutTagInput> = z.strictObject({
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(), 
  having: AccountScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AuthenticatorFindFirstArgsSchema: z.ZodType<Prisma.AuthenticatorFindFirstArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereInputSchema.optional(), 
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(), AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthenticatorScalarFieldEnumSchema, AuthenticatorScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuthenticatorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthenticatorFindFirstOrThrowArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereInputSchema.optional(), 
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(), AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthenticatorScalarFieldEnumSchema, AuthenticatorScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuthenticatorFindManyArgsSchema: z.ZodType<Prisma.AuthenticatorFindManyArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereInputSchema.optional(), 
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(), AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthenticatorScalarFieldEnumSchema, AuthenticatorScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuthenticatorAggregateArgsSchema: z.ZodType<Prisma.AuthenticatorAggregateArgs> = z.object({
  where: AuthenticatorWhereInputSchema.optional(), 
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(), AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuthenticatorGroupByArgsSchema: z.ZodType<Prisma.AuthenticatorGroupByArgs> = z.object({
  where: AuthenticatorWhereInputSchema.optional(), 
  orderBy: z.union([ AuthenticatorOrderByWithAggregationInputSchema.array(), AuthenticatorOrderByWithAggregationInputSchema ]).optional(),
  by: AuthenticatorScalarFieldEnumSchema.array(), 
  having: AuthenticatorScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuthenticatorFindUniqueArgsSchema: z.ZodType<Prisma.AuthenticatorFindUniqueArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema, 
}).strict();

export const AuthenticatorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthenticatorFindUniqueOrThrowArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema, 
}).strict();

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(), 
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(), 
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(), 
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(), 
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(), 
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(), PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(), 
  having: PostScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema, 
}).strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema, 
}).strict();

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(), 
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(), CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(), 
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(), CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(), 
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(), CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(), 
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(), CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(), 
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(), CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(), 
  having: CommentScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema, 
}).strict();

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema, 
}).strict();

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(), TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(), 
  having: TagScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const PostTagFindFirstArgsSchema: z.ZodType<Prisma.PostTagFindFirstArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereInputSchema.optional(), 
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(), PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostTagScalarFieldEnumSchema, PostTagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PostTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostTagFindFirstOrThrowArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereInputSchema.optional(), 
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(), PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostTagScalarFieldEnumSchema, PostTagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PostTagFindManyArgsSchema: z.ZodType<Prisma.PostTagFindManyArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereInputSchema.optional(), 
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(), PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostTagScalarFieldEnumSchema, PostTagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PostTagAggregateArgsSchema: z.ZodType<Prisma.PostTagAggregateArgs> = z.object({
  where: PostTagWhereInputSchema.optional(), 
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(), PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostTagGroupByArgsSchema: z.ZodType<Prisma.PostTagGroupByArgs> = z.object({
  where: PostTagWhereInputSchema.optional(), 
  orderBy: z.union([ PostTagOrderByWithAggregationInputSchema.array(), PostTagOrderByWithAggregationInputSchema ]).optional(),
  by: PostTagScalarFieldEnumSchema.array(), 
  having: PostTagScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostTagFindUniqueArgsSchema: z.ZodType<Prisma.PostTagFindUniqueArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema, 
}).strict();

export const PostTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostTagFindUniqueOrThrowArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema, AccountUncheckedCreateInputSchema ]),
}).strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
  create: z.union([ AccountCreateInputSchema, AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema ]),
}).strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema, AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema, AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuthenticatorCreateArgsSchema: z.ZodType<Prisma.AuthenticatorCreateArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  data: z.union([ AuthenticatorCreateInputSchema, AuthenticatorUncheckedCreateInputSchema ]),
}).strict();

export const AuthenticatorUpsertArgsSchema: z.ZodType<Prisma.AuthenticatorUpsertArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema, 
  create: z.union([ AuthenticatorCreateInputSchema, AuthenticatorUncheckedCreateInputSchema ]),
  update: z.union([ AuthenticatorUpdateInputSchema, AuthenticatorUncheckedUpdateInputSchema ]),
}).strict();

export const AuthenticatorCreateManyArgsSchema: z.ZodType<Prisma.AuthenticatorCreateManyArgs> = z.object({
  data: z.union([ AuthenticatorCreateManyInputSchema, AuthenticatorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuthenticatorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthenticatorCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuthenticatorCreateManyInputSchema, AuthenticatorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuthenticatorDeleteArgsSchema: z.ZodType<Prisma.AuthenticatorDeleteArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema, 
}).strict();

export const AuthenticatorUpdateArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  data: z.union([ AuthenticatorUpdateInputSchema, AuthenticatorUncheckedUpdateInputSchema ]),
  where: AuthenticatorWhereUniqueInputSchema, 
}).strict();

export const AuthenticatorUpdateManyArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateManyArgs> = z.object({
  data: z.union([ AuthenticatorUpdateManyMutationInputSchema, AuthenticatorUncheckedUpdateManyInputSchema ]),
  where: AuthenticatorWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuthenticatorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AuthenticatorUpdateManyMutationInputSchema, AuthenticatorUncheckedUpdateManyInputSchema ]),
  where: AuthenticatorWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuthenticatorDeleteManyArgsSchema: z.ZodType<Prisma.AuthenticatorDeleteManyArgs> = z.object({
  where: AuthenticatorWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema, PostUncheckedCreateInputSchema ]),
}).strict();

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema, 
  create: z.union([ PostCreateInputSchema, PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema, PostUncheckedUpdateInputSchema ]),
}).strict();

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema, PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema, PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema, 
}).strict();

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema, PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema, 
}).strict();

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema, PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PostUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema, PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema, CommentUncheckedCreateInputSchema ]),
}).strict();

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema, 
  create: z.union([ CommentCreateInputSchema, CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema, CommentUncheckedUpdateInputSchema ]),
}).strict();

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema, CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema, CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema, 
}).strict();

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema, CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema, 
}).strict();

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema, CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CommentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema, CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema, TagUncheckedCreateInputSchema ]),
}).strict();

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
  create: z.union([ TagCreateInputSchema, TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema, TagUncheckedUpdateInputSchema ]),
}).strict();

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema, TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema, TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema, TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema, TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema, TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PostTagCreateArgsSchema: z.ZodType<Prisma.PostTagCreateArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  data: z.union([ PostTagCreateInputSchema, PostTagUncheckedCreateInputSchema ]),
}).strict();

export const PostTagUpsertArgsSchema: z.ZodType<Prisma.PostTagUpsertArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema, 
  create: z.union([ PostTagCreateInputSchema, PostTagUncheckedCreateInputSchema ]),
  update: z.union([ PostTagUpdateInputSchema, PostTagUncheckedUpdateInputSchema ]),
}).strict();

export const PostTagCreateManyArgsSchema: z.ZodType<Prisma.PostTagCreateManyArgs> = z.object({
  data: z.union([ PostTagCreateManyInputSchema, PostTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostTagCreateManyInputSchema, PostTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostTagDeleteArgsSchema: z.ZodType<Prisma.PostTagDeleteArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema, 
}).strict();

export const PostTagUpdateArgsSchema: z.ZodType<Prisma.PostTagUpdateArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  data: z.union([ PostTagUpdateInputSchema, PostTagUncheckedUpdateInputSchema ]),
  where: PostTagWhereUniqueInputSchema, 
}).strict();

export const PostTagUpdateManyArgsSchema: z.ZodType<Prisma.PostTagUpdateManyArgs> = z.object({
  data: z.union([ PostTagUpdateManyMutationInputSchema, PostTagUncheckedUpdateManyInputSchema ]),
  where: PostTagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PostTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PostTagUpdateManyMutationInputSchema, PostTagUncheckedUpdateManyInputSchema ]),
  where: PostTagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PostTagDeleteManyArgsSchema: z.ZodType<Prisma.PostTagDeleteManyArgs> = z.object({
  where: PostTagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();