import type { Prisma } from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "name",
  "image",
  "emailVerified",
  "role",
  "createdAt",
  "updatedAt",
]);

export const AccountScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "expires_at",
  "token_type",
  "scope",
  "id_token",
  "session_state",
]);

export const AuthenticatorScalarFieldEnumSchema = z.enum([
  "credentialID",
  "userId",
  "providerAccountId",
  "credentialPublicKey",
  "counter",
  "credentialDeviceType",
  "credentialBackedUp",
  "transports",
]);

export const PostScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "slug",
  "content",
  "excerpt",
  "coverImage",
  "status",
  "publishedAt",
  "createdAt",
  "updatedAt",
  "authorId",
]);

export const CommentScalarFieldEnumSchema = z.enum([
  "id",
  "content",
  "createdAt",
  "updatedAt",
  "postId",
  "authorId",
]);

export const TagScalarFieldEnumSchema = z.enum(["id", "name", "slug"]);

export const PostTagScalarFieldEnumSchema = z.enum(["postId", "tagId"]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const RoleSchema = z.enum(["ADMIN", "USER"]);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const PostStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export type PostStatusType = `${z.infer<typeof PostStatusSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  createdAt: z.coerce.date(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  id: z.cuid(),
  image: z.string().nullable(),
  name: z.string().nullable(),
  role: RoleSchema,
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  id: z.cuid(),
  id_token: z.string().nullable(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  scope: z.string().nullable(),
  session_state: z.string().nullable(),
  token_type: z.string().nullable(),
  type: z.string(),
  userId: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// AUTHENTICATOR SCHEMA
/////////////////////////////////////////

export const AuthenticatorSchema = z.object({
  counter: z.number().int(),
  credentialBackedUp: z.boolean(),
  credentialDeviceType: z.string(),
  credentialID: z.string(),
  credentialPublicKey: z.string(),
  providerAccountId: z.string(),
  transports: z.string().nullable(),
  userId: z.string(),
});

export type Authenticator = z.infer<typeof AuthenticatorSchema>;

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  authorId: z.string(),
  content: z.string(),
  coverImage: z.string().nullable(),
  createdAt: z.coerce.date(),
  excerpt: z.string().nullable(),
  id: z.cuid(),
  publishedAt: z.coerce.date().nullable(),
  slug: z.string(),
  status: PostStatusSchema,
  title: z.string(),
  updatedAt: z.coerce.date(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  authorId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  id: z.cuid(),
  postId: z.string(),
  updatedAt: z.coerce.date(),
});

export type Comment = z.infer<typeof CommentSchema>;

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.cuid(),
  name: z.string(),
  slug: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;

/////////////////////////////////////////
// POST TAG SCHEMA
/////////////////////////////////////////

export const PostTagSchema = z.object({
  postId: z.string(),
  tagId: z.string(),
});

export type PostTag = z.infer<typeof PostTagSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    authenticators: z
      .union([z.boolean(), z.lazy(() => AuthenticatorFindManyArgsSchema)])
      .optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    posts: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    include: z.lazy(() => UserIncludeSchema).optional(),
    select: z.lazy(() => UserSelectSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      accounts: z.boolean().optional(),
      authenticators: z.boolean().optional(),
      comments: z.boolean().optional(),
      posts: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    authenticators: z
      .union([z.boolean(), z.lazy(() => AuthenticatorFindManyArgsSchema)])
      .optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    createdAt: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    id: z.boolean().optional(),
    image: z.boolean().optional(),
    name: z.boolean().optional(),
    posts: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    role: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    include: z.lazy(() => AccountIncludeSchema).optional(),
    select: z.lazy(() => AccountSelectSchema).optional(),
  })
  .strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    access_token: z.boolean().optional(),
    expires_at: z.boolean().optional(),
    id: z.boolean().optional(),
    id_token: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerAccountId: z.boolean().optional(),
    refresh_token: z.boolean().optional(),
    scope: z.boolean().optional(),
    session_state: z.boolean().optional(),
    token_type: z.boolean().optional(),
    type: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    userId: z.boolean().optional(),
  })
  .strict();

// AUTHENTICATOR
//------------------------------------------------------

export const AuthenticatorIncludeSchema: z.ZodType<Prisma.AuthenticatorInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict();

export const AuthenticatorArgsSchema: z.ZodType<Prisma.AuthenticatorDefaultArgs> =
  z
    .object({
      include: z.lazy(() => AuthenticatorIncludeSchema).optional(),
      select: z.lazy(() => AuthenticatorSelectSchema).optional(),
    })
    .strict();

export const AuthenticatorSelectSchema: z.ZodType<Prisma.AuthenticatorSelect> =
  z
    .object({
      counter: z.boolean().optional(),
      credentialBackedUp: z.boolean().optional(),
      credentialDeviceType: z.boolean().optional(),
      credentialID: z.boolean().optional(),
      credentialPublicKey: z.boolean().optional(),
      providerAccountId: z.boolean().optional(),
      transports: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      userId: z.boolean().optional(),
    })
    .strict();

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsSchema)])
      .optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    tags: z
      .union([z.boolean(), z.lazy(() => PostTagFindManyArgsSchema)])
      .optional(),
  })
  .strict();

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z
  .object({
    include: z.lazy(() => PostIncludeSchema).optional(),
    select: z.lazy(() => PostSelectSchema).optional(),
  })
  .strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> =
  z
    .object({
      comments: z.boolean().optional(),
      tags: z.boolean().optional(),
    })
    .strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsSchema)])
      .optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    authorId: z.boolean().optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    content: z.boolean().optional(),
    coverImage: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    excerpt: z.boolean().optional(),
    id: z.boolean().optional(),
    publishedAt: z.boolean().optional(),
    slug: z.boolean().optional(),
    status: z.boolean().optional(),
    tags: z
      .union([z.boolean(), z.lazy(() => PostTagFindManyArgsSchema)])
      .optional(),
    title: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z
  .object({
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
  })
  .strict();

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z
  .object({
    include: z.lazy(() => CommentIncludeSchema).optional(),
    select: z.lazy(() => CommentSelectSchema).optional(),
  })
  .strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z
  .object({
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    authorId: z.boolean().optional(),
    content: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    id: z.boolean().optional(),
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    postId: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => TagCountOutputTypeArgsSchema)])
      .optional(),
    posts: z
      .union([z.boolean(), z.lazy(() => PostTagFindManyArgsSchema)])
      .optional(),
  })
  .strict();

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z
  .object({
    include: z.lazy(() => TagIncludeSchema).optional(),
    select: z.lazy(() => TagSelectSchema).optional(),
  })
  .strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> =
  z
    .object({
      posts: z.boolean().optional(),
    })
    .strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => TagCountOutputTypeArgsSchema)])
      .optional(),
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    posts: z
      .union([z.boolean(), z.lazy(() => PostTagFindManyArgsSchema)])
      .optional(),
    slug: z.boolean().optional(),
  })
  .strict();

// POST TAG
//------------------------------------------------------

export const PostTagIncludeSchema: z.ZodType<Prisma.PostTagInclude> = z
  .object({
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    tag: z.union([z.boolean(), z.lazy(() => TagArgsSchema)]).optional(),
  })
  .strict();

export const PostTagArgsSchema: z.ZodType<Prisma.PostTagDefaultArgs> = z
  .object({
    include: z.lazy(() => PostTagIncludeSchema).optional(),
    select: z.lazy(() => PostTagSelectSchema).optional(),
  })
  .strict();

export const PostTagSelectSchema: z.ZodType<Prisma.PostTagSelect> = z
  .object({
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    postId: z.boolean().optional(),
    tag: z.union([z.boolean(), z.lazy(() => TagArgsSchema)]).optional(),
    tagId: z.boolean().optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> =
  z.strictObject({
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorListRelationFilterSchema)
      .optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emailVerified: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    posts: z.lazy(() => PostListRelationFilterSchema).optional(),
    role: z
      .union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountOrderByRelationAggregateInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorOrderByRelationAggregateInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentOrderByRelationAggregateInputSchema)
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    name: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        email: z.string(),
        id: z.cuid(),
      }),
      z.object({
        id: z.cuid(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
        AND: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        authenticators: z
          .lazy(() => AuthenticatorListRelationFilterSchema)
          .optional(),
        comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        email: z.string().optional(),
        emailVerified: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        id: z.cuid().optional(),
        image: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        name: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        NOT: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        posts: z.lazy(() => PostListRelationFilterSchema).optional(),
        role: z
          .union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
      })
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z.strictObject({
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    name: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    email: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    emailVerified: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    image: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    role: z
      .union([
        z.lazy(() => EnumRoleWithAggregatesFilterSchema),
        z.lazy(() => RoleSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> =
  z.strictObject({
    access_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    expires_at: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    id_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    session_state: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    token_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z.strictObject({
    access_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    expires_at: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    id_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    provider: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    refresh_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    session_state: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    token_type: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.cuid(),
        provider_providerAccountId: z.lazy(
          () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
        ),
      }),
      z.object({
        id: z.cuid(),
      }),
      z.object({
        provider_providerAccountId: z.lazy(
          () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
        ),
      }),
    ])
    .and(
      z.strictObject({
        access_token: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        AND: z
          .union([
            z.lazy(() => AccountWhereInputSchema),
            z.lazy(() => AccountWhereInputSchema).array(),
          ])
          .optional(),
        expires_at: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        id: z.cuid().optional(),
        id_token: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        NOT: z
          .union([
            z.lazy(() => AccountWhereInputSchema),
            z.lazy(() => AccountWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => AccountWhereInputSchema)
          .array()
          .optional(),
        provider: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        provider_providerAccountId: z
          .lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
          .optional(),
        providerAccountId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        refresh_token: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        scope: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        session_state: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        token_type: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        type: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        user: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
      })
    );

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z.strictObject({
    _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
    _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
    access_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    expires_at: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    id_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    provider: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    refresh_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    session_state: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    token_type: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z.strictObject({
    access_token: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    expires_at: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
      .optional()
      .nullable(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    id_token: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    provider: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const AuthenticatorWhereInputSchema: z.ZodType<Prisma.AuthenticatorWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AuthenticatorWhereInputSchema),
        z.lazy(() => AuthenticatorWhereInputSchema).array(),
      ])
      .optional(),
    counter: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    credentialBackedUp: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    credentialDeviceType: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    credentialID: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    credentialPublicKey: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AuthenticatorWhereInputSchema),
        z.lazy(() => AuthenticatorWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AuthenticatorWhereInputSchema)
      .array()
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    transports: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const AuthenticatorOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthenticatorOrderByWithRelationInput> =
  z.strictObject({
    counter: z.lazy(() => SortOrderSchema).optional(),
    credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
    credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
    credentialID: z.lazy(() => SortOrderSchema).optional(),
    credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    transports: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorWhereUniqueInputSchema: z.ZodType<Prisma.AuthenticatorWhereUniqueInput> =
  z
    .union([
      z.object({
        credentialID: z.string(),
        userId_credentialID: z.lazy(
          () => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema
        ),
      }),
      z.object({
        userId_credentialID: z.lazy(
          () => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema
        ),
      }),
      z.object({
        credentialID: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        AND: z
          .union([
            z.lazy(() => AuthenticatorWhereInputSchema),
            z.lazy(() => AuthenticatorWhereInputSchema).array(),
          ])
          .optional(),
        counter: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        credentialBackedUp: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        credentialDeviceType: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        credentialID: z.string().optional(),
        credentialPublicKey: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        NOT: z
          .union([
            z.lazy(() => AuthenticatorWhereInputSchema),
            z.lazy(() => AuthenticatorWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => AuthenticatorWhereInputSchema)
          .array()
          .optional(),
        providerAccountId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        transports: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        user: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        userId_credentialID: z
          .lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema)
          .optional(),
      })
    );

export const AuthenticatorOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthenticatorOrderByWithAggregationInput> =
  z.strictObject({
    _avg: z.lazy(() => AuthenticatorAvgOrderByAggregateInputSchema).optional(),
    _count: z
      .lazy(() => AuthenticatorCountOrderByAggregateInputSchema)
      .optional(),
    _max: z.lazy(() => AuthenticatorMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AuthenticatorMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => AuthenticatorSumOrderByAggregateInputSchema).optional(),
    counter: z.lazy(() => SortOrderSchema).optional(),
    credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
    credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
    credentialID: z.lazy(() => SortOrderSchema).optional(),
    credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    transports: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthenticatorScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    counter: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    credentialBackedUp: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    credentialDeviceType: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    credentialID: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    credentialPublicKey: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    transports: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    author: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    coverImage: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    excerpt: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputSchema)
      .array()
      .optional(),
    publishedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z
      .union([
        z.lazy(() => EnumPostStatusFilterSchema),
        z.lazy(() => PostStatusSchema),
      ])
      .optional(),
    tags: z.lazy(() => PostTagListRelationFilterSchema).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> =
  z.strictObject({
    author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    comments: z
      .lazy(() => CommentOrderByRelationAggregateInputSchema)
      .optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    coverImage: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    excerpt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    publishedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    tags: z.lazy(() => PostTagOrderByRelationAggregateInputSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> =
  z
    .union([
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
    .and(
      z.strictObject({
        AND: z
          .union([
            z.lazy(() => PostWhereInputSchema),
            z.lazy(() => PostWhereInputSchema).array(),
          ])
          .optional(),
        author: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
        authorId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
        content: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        coverImage: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        excerpt: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        id: z.cuid().optional(),
        NOT: z
          .union([
            z.lazy(() => PostWhereInputSchema),
            z.lazy(() => PostWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => PostWhereInputSchema)
          .array()
          .optional(),
        publishedAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        slug: z.string().optional(),
        status: z
          .union([
            z.lazy(() => EnumPostStatusFilterSchema),
            z.lazy(() => PostStatusSchema),
          ])
          .optional(),
        tags: z.lazy(() => PostTagListRelationFilterSchema).optional(),
        title: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
      })
    );

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> =
  z.strictObject({
    _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    coverImage: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    excerpt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    publishedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
        z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    content: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    coverImage: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    excerpt: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
        z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    publishedAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumPostStatusWithAggregatesFilterSchema),
        z.lazy(() => PostStatusSchema),
      ])
      .optional(),
    title: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CommentWhereInputSchema),
        z.lazy(() => CommentWhereInputSchema).array(),
      ])
      .optional(),
    author: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => CommentWhereInputSchema),
        z.lazy(() => CommentWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentWhereInputSchema)
      .array()
      .optional(),
    post: z
      .union([
        z.lazy(() => PostScalarRelationFilterSchema),
        z.lazy(() => PostWhereInputSchema),
      ])
      .optional(),
    postId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> =
  z.strictObject({
    author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> =
  z
    .object({
      id: z.cuid(),
    })
    .and(
      z.strictObject({
        AND: z
          .union([
            z.lazy(() => CommentWhereInputSchema),
            z.lazy(() => CommentWhereInputSchema).array(),
          ])
          .optional(),
        author: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
        authorId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        content: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        id: z.cuid().optional(),
        NOT: z
          .union([
            z.lazy(() => CommentWhereInputSchema),
            z.lazy(() => CommentWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => CommentWhereInputSchema)
          .array()
          .optional(),
        post: z
          .union([
            z.lazy(() => PostScalarRelationFilterSchema),
            z.lazy(() => PostWhereInputSchema),
          ])
          .optional(),
        postId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
      })
    );

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> =
  z.strictObject({
    _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),
        z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    content: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),
        z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    postId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => TagWhereInputSchema),
        z.lazy(() => TagWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => TagWhereInputSchema),
        z.lazy(() => TagWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TagWhereInputSchema)
      .array()
      .optional(),
    posts: z.lazy(() => PostTagListRelationFilterSchema).optional(),
    slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    posts: z.lazy(() => PostTagOrderByRelationAggregateInputSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
  });

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> =
  z
    .union([
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
    .and(
      z.strictObject({
        AND: z
          .union([
            z.lazy(() => TagWhereInputSchema),
            z.lazy(() => TagWhereInputSchema).array(),
          ])
          .optional(),
        id: z.cuid().optional(),
        name: z.string().optional(),
        NOT: z
          .union([
            z.lazy(() => TagWhereInputSchema),
            z.lazy(() => TagWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => TagWhereInputSchema)
          .array()
          .optional(),
        posts: z.lazy(() => PostTagListRelationFilterSchema).optional(),
        slug: z.string().optional(),
      })
    );

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> =
  z.strictObject({
    _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
  });

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema),
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema),
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TagScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    slug: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const PostTagWhereInputSchema: z.ZodType<Prisma.PostTagWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => PostTagWhereInputSchema),
        z.lazy(() => PostTagWhereInputSchema).array(),
      ])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostTagWhereInputSchema),
        z.lazy(() => PostTagWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostTagWhereInputSchema)
      .array()
      .optional(),
    post: z
      .union([
        z.lazy(() => PostScalarRelationFilterSchema),
        z.lazy(() => PostWhereInputSchema),
      ])
      .optional(),
    postId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tag: z
      .union([
        z.lazy(() => TagScalarRelationFilterSchema),
        z.lazy(() => TagWhereInputSchema),
      ])
      .optional(),
    tagId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const PostTagOrderByWithRelationInputSchema: z.ZodType<Prisma.PostTagOrderByWithRelationInput> =
  z.strictObject({
    post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
    tagId: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostTagWhereUniqueInputSchema: z.ZodType<Prisma.PostTagWhereUniqueInput> =
  z
    .object({
      postId_tagId: z.lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema),
    })
    .and(
      z.strictObject({
        AND: z
          .union([
            z.lazy(() => PostTagWhereInputSchema),
            z.lazy(() => PostTagWhereInputSchema).array(),
          ])
          .optional(),
        NOT: z
          .union([
            z.lazy(() => PostTagWhereInputSchema),
            z.lazy(() => PostTagWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => PostTagWhereInputSchema)
          .array()
          .optional(),
        post: z
          .union([
            z.lazy(() => PostScalarRelationFilterSchema),
            z.lazy(() => PostWhereInputSchema),
          ])
          .optional(),
        postId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        postId_tagId: z
          .lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema)
          .optional(),
        tag: z
          .union([
            z.lazy(() => TagScalarRelationFilterSchema),
            z.lazy(() => TagWhereInputSchema),
          ])
          .optional(),
        tagId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
      })
    );

export const PostTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostTagOrderByWithAggregationInput> =
  z.strictObject({
    _count: z.lazy(() => PostTagCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => PostTagMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => PostTagMinOrderByAggregateInputSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    tagId: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostTagScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema),
        z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema),
        z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostTagScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    postId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    tagId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z.strictObject({
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z.strictObject({
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z.strictObject({
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> =
  z.strictObject({
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    id: z.cuid().optional(),
    id_token: z.string().optional().nullable(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    token_type: z.string().optional().nullable(),
    type: z.string(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  });

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z.strictObject({
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    id: z.cuid().optional(),
    id_token: z.string().optional().nullable(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    token_type: z.string().optional().nullable(),
    type: z.string(),
    userId: z.string(),
  });

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
      .optional(),
  });

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z.strictObject({
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    id: z.cuid().optional(),
    id_token: z.string().optional().nullable(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    token_type: z.string().optional().nullable(),
    type: z.string(),
    userId: z.string(),
  });

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AuthenticatorCreateInputSchema: z.ZodType<Prisma.AuthenticatorCreateInput> =
  z.strictObject({
    counter: z.number().int(),
    credentialBackedUp: z.boolean(),
    credentialDeviceType: z.string(),
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    providerAccountId: z.string(),
    transports: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutAuthenticatorsInputSchema),
  });

export const AuthenticatorUncheckedCreateInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateInput> =
  z.strictObject({
    counter: z.number().int(),
    credentialBackedUp: z.boolean(),
    credentialDeviceType: z.string(),
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    providerAccountId: z.string(),
    transports: z.string().optional().nullable(),
    userId: z.string(),
  });

export const AuthenticatorUpdateInputSchema: z.ZodType<Prisma.AuthenticatorUpdateInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAuthenticatorsNestedInputSchema)
      .optional(),
  });

export const AuthenticatorUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AuthenticatorCreateManyInputSchema: z.ZodType<Prisma.AuthenticatorCreateManyInput> =
  z.strictObject({
    counter: z.number().int(),
    credentialBackedUp: z.boolean(),
    credentialDeviceType: z.string(),
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    providerAccountId: z.string(),
    transports: z.string().optional().nullable(),
    userId: z.string(),
  });

export const AuthenticatorUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyMutationInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const AuthenticatorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> =
  z.strictObject({
    author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutPostInputSchema)
      .optional(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    tags: z
      .lazy(() => PostTagCreateNestedManyWithoutPostInputSchema)
      .optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> =
  z.strictObject({
    authorId: z.string(),
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema)
      .optional(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    tags: z
      .lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema)
      .optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> =
  z.strictObject({
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tags: z
      .lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tags: z
      .lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z.strictObject({
    authorId: z.string(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> =
  z.strictObject({
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> =
  z.strictObject({
    author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> =
  z.strictObject({
    authorId: z.string(),
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    postId: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> =
  z.strictObject({
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    post: z
      .lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema)
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> =
  z.strictObject({
    authorId: z.string(),
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    postId: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> =
  z.strictObject({
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    posts: z
      .lazy(() => PostTagCreateNestedManyWithoutTagInputSchema)
      .optional(),
    slug: z.string(),
  });

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    posts: z
      .lazy(() => PostTagUncheckedCreateNestedManyWithoutTagInputSchema)
      .optional(),
    slug: z.string(),
  });

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    posts: z
      .lazy(() => PostTagUpdateManyWithoutTagNestedInputSchema)
      .optional(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    posts: z
      .lazy(() => PostTagUncheckedUpdateManyWithoutTagNestedInputSchema)
      .optional(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    slug: z.string(),
  });

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostTagCreateInputSchema: z.ZodType<Prisma.PostTagCreateInput> =
  z.strictObject({
    post: z.lazy(() => PostCreateNestedOneWithoutTagsInputSchema),
    tag: z.lazy(() => TagCreateNestedOneWithoutPostsInputSchema),
  });

export const PostTagUncheckedCreateInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateInput> =
  z.strictObject({
    postId: z.string(),
    tagId: z.string(),
  });

export const PostTagUpdateInputSchema: z.ZodType<Prisma.PostTagUpdateInput> =
  z.strictObject({
    post: z
      .lazy(() => PostUpdateOneRequiredWithoutTagsNestedInputSchema)
      .optional(),
    tag: z
      .lazy(() => TagUpdateOneRequiredWithoutPostsNestedInputSchema)
      .optional(),
  });

export const PostTagUncheckedUpdateInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateInput> =
  z.strictObject({
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tagId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostTagCreateManyInputSchema: z.ZodType<Prisma.PostTagCreateManyInput> =
  z.strictObject({
    postId: z.string(),
    tagId: z.string(),
  });

export const PostTagUpdateManyMutationInputSchema: z.ZodType<Prisma.PostTagUpdateManyMutationInput> =
  z.strictObject({});

export const PostTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyInput> =
  z.strictObject({
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tagId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
  z.strictObject({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  });

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z.strictObject({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional().nullable(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
    notIn: z.string().array().optional().nullable(),
    startsWith: z.string().optional(),
  });

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
  });

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> =
  z.strictObject({
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
  });

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
    notIn: z.coerce.date().array().optional(),
  });

export const AuthenticatorListRelationFilterSchema: z.ZodType<Prisma.AuthenticatorListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
    none: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
    some: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
  });

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => AccountWhereInputSchema).optional(),
    none: z.lazy(() => AccountWhereInputSchema).optional(),
    some: z.lazy(() => AccountWhereInputSchema).optional(),
  });

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => PostWhereInputSchema).optional(),
    none: z.lazy(() => PostWhereInputSchema).optional(),
    some: z.lazy(() => PostWhereInputSchema).optional(),
  });

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => CommentWhereInputSchema).optional(),
    none: z.lazy(() => CommentWhereInputSchema).optional(),
    some: z.lazy(() => CommentWhereInputSchema).optional(),
  });

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
  z.strictObject({
    nulls: z.lazy(() => NullsOrderSchema).optional(),
    sort: z.lazy(() => SortOrderSchema),
  });

export const AuthenticatorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuthenticatorOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z.strictObject({
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z.strictObject({
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z.strictObject({
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  });

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional().nullable(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.string().array().optional().nullable(),
    startsWith: z.string().optional(),
  });

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    equals: z.coerce.date().optional().nullable(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
  });

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
  });

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    equals: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    notIn: z.coerce.date().array().optional(),
  });

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
    notIn: z.number().array().optional().nullable(),
  });

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> =
  z.strictObject({
    provider: z.string(),
    providerAccountId: z.string(),
  });

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z.strictObject({
    access_token: z.lazy(() => SortOrderSchema).optional(),
    expires_at: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    id_token: z.lazy(() => SortOrderSchema).optional(),
    provider: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    refresh_token: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    session_state: z.lazy(() => SortOrderSchema).optional(),
    token_type: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> =
  z.strictObject({
    expires_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z.strictObject({
    access_token: z.lazy(() => SortOrderSchema).optional(),
    expires_at: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    id_token: z.lazy(() => SortOrderSchema).optional(),
    provider: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    refresh_token: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    session_state: z.lazy(() => SortOrderSchema).optional(),
    token_type: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z.strictObject({
    access_token: z.lazy(() => SortOrderSchema).optional(),
    expires_at: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    id_token: z.lazy(() => SortOrderSchema).optional(),
    provider: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    refresh_token: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    session_state: z.lazy(() => SortOrderSchema).optional(),
    token_type: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> =
  z.strictObject({
    expires_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z.strictObject({
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    equals: z.number().optional().nullable(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([
        z.number(),
        z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.number().array().optional().nullable(),
  });

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  in: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  notIn: z.number().array().optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
});

export const AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema: z.ZodType<Prisma.AuthenticatorUserIdCredentialIDCompoundUniqueInput> =
  z.strictObject({
    credentialID: z.string(),
    userId: z.string(),
  });

export const AuthenticatorCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorCountOrderByAggregateInput> =
  z.strictObject({
    counter: z.lazy(() => SortOrderSchema).optional(),
    credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
    credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
    credentialID: z.lazy(() => SortOrderSchema).optional(),
    credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    transports: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorAvgOrderByAggregateInput> =
  z.strictObject({
    counter: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorMaxOrderByAggregateInput> =
  z.strictObject({
    counter: z.lazy(() => SortOrderSchema).optional(),
    credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
    credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
    credentialID: z.lazy(() => SortOrderSchema).optional(),
    credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    transports: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorMinOrderByAggregateInput> =
  z.strictObject({
    counter: z.lazy(() => SortOrderSchema).optional(),
    credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
    credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
    credentialID: z.lazy(() => SortOrderSchema).optional(),
    credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    transports: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorSumOrderByAggregateInput> =
  z.strictObject({
    counter: z.lazy(() => SortOrderSchema).optional(),
  });

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z.strictObject({
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
      .optional(),
    notIn: z.number().array().optional(),
  });

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
  });

export const EnumPostStatusFilterSchema: z.ZodType<Prisma.EnumPostStatusFilter> =
  z.strictObject({
    equals: z.lazy(() => PostStatusSchema).optional(),
    in: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => NestedEnumPostStatusFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
  });

export const PostTagListRelationFilterSchema: z.ZodType<Prisma.PostTagListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => PostTagWhereInputSchema).optional(),
    none: z.lazy(() => PostTagWhereInputSchema).optional(),
    some: z.lazy(() => PostTagWhereInputSchema).optional(),
  });

export const PostTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostTagOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> =
  z.strictObject({
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    coverImage: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    excerpt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    publishedAt: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> =
  z.strictObject({
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    coverImage: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    excerpt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    publishedAt: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> =
  z.strictObject({
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    coverImage: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    excerpt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    publishedAt: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const EnumPostStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPostStatusWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
    equals: z.lazy(() => PostStatusSchema).optional(),
    in: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => NestedEnumPostStatusWithAggregatesFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
  });

export const PostScalarRelationFilterSchema: z.ZodType<Prisma.PostScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => PostWhereInputSchema).optional(),
    isNot: z.lazy(() => PostWhereInputSchema).optional(),
  });

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> =
  z.strictObject({
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> =
  z.strictObject({
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> =
  z.strictObject({
    authorId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    id: z.lazy(() => SortOrderSchema).optional(),
    postId: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
  });

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
  });

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
  });

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => TagWhereInputSchema).optional(),
    isNot: z.lazy(() => TagWhereInputSchema).optional(),
  });

export const PostTagPostIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.PostTagPostIdTagIdCompoundUniqueInput> =
  z.strictObject({
    postId: z.string(),
    tagId: z.string(),
  });

export const PostTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagCountOrderByAggregateInput> =
  z.strictObject({
    postId: z.lazy(() => SortOrderSchema).optional(),
    tagId: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagMaxOrderByAggregateInput> =
  z.strictObject({
    postId: z.lazy(() => SortOrderSchema).optional(),
    tagId: z.lazy(() => SortOrderSchema).optional(),
  });

export const PostTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagMinOrderByAggregateInput> =
  z.strictObject({
    postId: z.lazy(() => SortOrderSchema).optional(),
    tagId: z.lazy(() => SortOrderSchema).optional(),
  });

export const AuthenticatorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateNestedManyWithoutUserInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),
        z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema)
      .optional(),
  });

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
  });

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
      .optional(),
  });

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyAuthorInputEnvelopeSchema)
      .optional(),
  });

export const AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateNestedManyWithoutUserInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),
        z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema)
      .optional(),
  });

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
  });

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
      .optional(),
  });

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyAuthorInputEnvelopeSchema)
      .optional(),
  });

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional(),
  });

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional().nullable(),
  });

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional().nullable(),
  });

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => RoleSchema).optional(),
  });

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional(),
  });

export const AuthenticatorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),
        z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AuthenticatorScalarWhereInputSchema),
        z.lazy(() => AuthenticatorScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
  });

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
  });

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostScalarWhereInputSchema),
        z.lazy(() => PostScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),
        z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),
        z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),
        z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array(),
      ])
      .optional(),
  });

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CommentScalarWhereInputSchema),
        z.lazy(() => CommentScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),
        z
          .lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
  });

export const AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),
        z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),
        z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AuthenticatorScalarWhereInputSchema),
        z.lazy(() => AuthenticatorScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => AuthenticatorWhereUniqueInputSchema),
        z.lazy(() => AuthenticatorWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
  });

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
  });

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostScalarWhereInputSchema),
        z.lazy(() => PostScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostWhereUniqueInputSchema),
        z.lazy(() => PostWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),
        z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),
        z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),
        z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array(),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CommentScalarWhereInputSchema),
        z.lazy(() => CommentScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),
        z
          .lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
  });

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
  });

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z.strictObject({
    decrement: z.number().optional(),
    divide: z.number().optional(),
    increment: z.number().optional(),
    multiply: z.number().optional(),
    set: z.number().optional().nullable(),
  });

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  });

export const UserCreateNestedOneWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthenticatorsInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAuthenticatorsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema),
      ])
      .optional(),
  });

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z.strictObject({
    decrement: z.number().optional(),
    divide: z.number().optional(),
    increment: z.number().optional(),
    multiply: z.number().optional(),
    set: z.number().optional(),
  });

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.boolean().optional(),
  });

export const UserUpdateOneRequiredWithoutAuthenticatorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthenticatorsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAuthenticatorsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutAuthenticatorsInputSchema),
        z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutAuthenticatorsInputSchema).optional(),
  });

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutPostsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
      ])
      .optional(),
  });

export const CommentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutPostInputSchema),
        z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
      .optional(),
  });

export const PostTagCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateNestedManyWithoutPostInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutPostInputSchema),
        z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyPostInputEnvelopeSchema)
      .optional(),
  });

export const CommentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutPostInputSchema),
        z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
      .optional(),
  });

export const PostTagUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutPostInputSchema),
        z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyPostInputEnvelopeSchema)
      .optional(),
  });

export const EnumPostStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPostStatusFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => PostStatusSchema).optional(),
  });

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutPostsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),
        z.lazy(() => UserUpdateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  });

export const CommentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPostNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutPostInputSchema),
        z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CommentScalarWhereInputSchema),
        z.lazy(() => CommentScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),
        z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
  });

export const PostTagUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithoutPostNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutPostInputSchema),
        z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyPostInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostTagScalarWhereInputSchema),
        z.lazy(() => PostTagScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema),
        z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => CommentCreateWithoutPostInputSchema),
        z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CommentScalarWhereInputSchema),
        z.lazy(() => CommentScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => CommentWhereUniqueInputSchema),
        z.lazy(() => CommentWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),
        z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
  });

export const PostTagUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutPostInputSchema),
        z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyPostInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostTagScalarWhereInputSchema),
        z.lazy(() => PostTagScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema),
        z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema),
        z
          .lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema)
          .array(),
      ])
      .optional(),
  });

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> =
  z.strictObject({
    connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => PostCreateOrConnectWithoutCommentsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutCommentsInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
      ])
      .optional(),
  });

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutCommentsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCommentsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
      ])
      .optional(),
  });

export const PostUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => PostCreateOrConnectWithoutCommentsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutCommentsInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputSchema),
        z.lazy(() => PostUpdateWithoutCommentsInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  });

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutCommentsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCommentsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),
        z.lazy(() => UserUpdateWithoutCommentsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  });

export const PostTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateNestedManyWithoutTagInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutTagInputSchema),
        z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyTagInputEnvelopeSchema)
      .optional(),
  });

export const PostTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateNestedManyWithoutTagInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutTagInputSchema),
        z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyTagInputEnvelopeSchema)
      .optional(),
  });

export const PostTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithoutTagNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutTagInputSchema),
        z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyTagInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostTagScalarWhereInputSchema),
        z.lazy(() => PostTagScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema),
        z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema),
        z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema),
        z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema).array(),
      ])
      .optional(),
  });

export const PostTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutTagNestedInput> =
  z.strictObject({
    connect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),
        z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array(),
      ])
      .optional(),
    create: z
      .union([
        z.lazy(() => PostTagCreateWithoutTagInputSchema),
        z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),
        z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PostTagCreateManyTagInputEnvelopeSchema)
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostTagScalarWhereInputSchema),
        z.lazy(() => PostTagScalarWhereInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostTagWhereUniqueInputSchema),
        z.lazy(() => PostTagWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema),
        z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema),
        z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema),
        z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema).array(),
      ])
      .optional(),
  });

export const PostCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutTagsInput> =
  z.strictObject({
    connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => PostCreateOrConnectWithoutTagsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutTagsInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema),
      ])
      .optional(),
  });

export const TagCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutPostsInput> =
  z.strictObject({
    connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => TagCreateOrConnectWithoutPostsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => TagCreateWithoutPostsInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema),
      ])
      .optional(),
  });

export const PostUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutTagsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => PostCreateOrConnectWithoutTagsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => PostCreateWithoutTagsInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PostUpdateToOneWithWhereWithoutTagsInputSchema),
        z.lazy(() => PostUpdateWithoutTagsInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => PostUpsertWithoutTagsInputSchema).optional(),
  });

export const TagUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutPostsNestedInput> =
  z.strictObject({
    connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
    connectOrCreate: z
      .lazy(() => TagCreateOrConnectWithoutPostsInputSchema)
      .optional(),
    create: z
      .union([
        z.lazy(() => TagCreateWithoutPostsInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => TagUpdateToOneWithWhereWithoutPostsInputSchema),
        z.lazy(() => TagUpdateWithoutPostsInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema),
      ])
      .optional(),
    upsert: z.lazy(() => TagUpsertWithoutPostsInputSchema).optional(),
  });

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
  z.strictObject({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  });

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z.strictObject({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional().nullable(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
    notIn: z.string().array().optional().nullable(),
    startsWith: z.string().optional(),
  });

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
  });

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
  z.strictObject({
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
  });

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
    notIn: z.coerce.date().array().optional(),
  });

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  });

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
  z.strictObject({
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
    notIn: z.number().array().optional(),
  });

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional().nullable(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.string().array().optional().nullable(),
    startsWith: z.string().optional(),
  });

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
    notIn: z.number().array().optional().nullable(),
  });

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    equals: z.coerce.date().optional().nullable(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
  });

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
  });

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    equals: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    notIn: z.coerce.date().array().optional(),
  });

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z.strictObject({
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    equals: z.number().optional().nullable(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([
        z.number(),
        z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    notIn: z.number().array().optional().nullable(),
  });

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
      .optional()
      .nullable(),
    notIn: z.number().array().optional().nullable(),
  });

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  });

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z.strictObject({
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
      .optional(),
    notIn: z.number().array().optional(),
  });

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> =
  z.strictObject({
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
    notIn: z.number().array().optional(),
  });

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
  });

export const NestedEnumPostStatusFilterSchema: z.ZodType<Prisma.NestedEnumPostStatusFilter> =
  z.strictObject({
    equals: z.lazy(() => PostStatusSchema).optional(),
    in: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => NestedEnumPostStatusFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
  });

export const NestedEnumPostStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPostStatusWithAggregatesFilter> =
  z.strictObject({
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumPostStatusFilterSchema).optional(),
    equals: z.lazy(() => PostStatusSchema).optional(),
    in: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => NestedEnumPostStatusWithAggregatesFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => PostStatusSchema)
      .array()
      .optional(),
  });

export const AuthenticatorCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateWithoutUserInput> =
  z.strictObject({
    counter: z.number().int(),
    credentialBackedUp: z.boolean(),
    credentialDeviceType: z.string(),
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    providerAccountId: z.string(),
    transports: z.string().optional().nullable(),
  });

export const AuthenticatorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateWithoutUserInput> =
  z.strictObject({
    counter: z.number().int(),
    credentialBackedUp: z.boolean(),
    credentialDeviceType: z.string(),
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    providerAccountId: z.string(),
    transports: z.string().optional().nullable(),
  });

export const AuthenticatorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateOrConnectWithoutUserInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),
      z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  });

export const AuthenticatorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AuthenticatorCreateManyUserInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AuthenticatorCreateManyUserInputSchema),
      z.lazy(() => AuthenticatorCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z.strictObject({
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    id: z.cuid().optional(),
    id_token: z.string().optional().nullable(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    token_type: z.string().optional().nullable(),
    type: z.string(),
  });

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z.strictObject({
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    id: z.cuid().optional(),
    id_token: z.string().optional().nullable(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    token_type: z.string().optional().nullable(),
    type: z.string(),
  });

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AccountWhereUniqueInputSchema),
  });

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AccountCreateManyUserInputSchema),
      z.lazy(() => AccountCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> =
  z.strictObject({
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutPostInputSchema)
      .optional(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    tags: z
      .lazy(() => PostTagCreateNestedManyWithoutPostInputSchema)
      .optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> =
  z.strictObject({
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema)
      .optional(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    tags: z
      .lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema)
      .optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostCreateWithoutAuthorInputSchema),
      z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => PostWhereUniqueInputSchema),
  });

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostCreateManyAuthorInputSchema),
      z.lazy(() => PostCreateManyAuthorInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> =
  z.strictObject({
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> =
  z.strictObject({
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    postId: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => CommentCreateWithoutAuthorInputSchema),
      z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => CommentWhereUniqueInputSchema),
  });

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => CommentCreateManyAuthorInputSchema),
      z.lazy(() => CommentCreateManyAuthorInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpsertWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),
      z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),
    ]),
    update: z.union([
      z.lazy(() => AuthenticatorUpdateWithoutUserInputSchema),
      z.lazy(() => AuthenticatorUncheckedUpdateWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  });

export const AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AuthenticatorUpdateWithoutUserInputSchema),
      z.lazy(() => AuthenticatorUncheckedUpdateWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  });

export const AuthenticatorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyWithWhereWithoutUserInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AuthenticatorUpdateManyMutationInputSchema),
      z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AuthenticatorScalarWhereInputSchema),
  });

export const AuthenticatorScalarWhereInputSchema: z.ZodType<Prisma.AuthenticatorScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AuthenticatorScalarWhereInputSchema),
        z.lazy(() => AuthenticatorScalarWhereInputSchema).array(),
      ])
      .optional(),
    counter: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    credentialBackedUp: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    credentialDeviceType: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    credentialID: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    credentialPublicKey: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AuthenticatorScalarWhereInputSchema),
        z.lazy(() => AuthenticatorScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AuthenticatorScalarWhereInputSchema)
      .array()
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    transports: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
    update: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AccountWhereUniqueInputSchema),
  });

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AccountWhereUniqueInputSchema),
  });

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AccountUpdateManyMutationInputSchema),
      z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
    ]),
    where: z.lazy(() => AccountScalarWhereInputSchema),
  });

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z.strictObject({
    access_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    expires_at: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    id_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereInputSchema)
      .array()
      .optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    session_state: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    token_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostCreateWithoutAuthorInputSchema),
      z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
    ]),
    update: z.union([
      z.lazy(() => PostUpdateWithoutAuthorInputSchema),
      z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => PostWhereUniqueInputSchema),
  });

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostUpdateWithoutAuthorInputSchema),
      z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => PostWhereUniqueInputSchema),
  });

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostUpdateManyMutationInputSchema),
      z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => PostScalarWhereInputSchema),
  });

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => PostScalarWhereInputSchema),
        z.lazy(() => PostScalarWhereInputSchema).array(),
      ])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    coverImage: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    excerpt: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => PostScalarWhereInputSchema),
        z.lazy(() => PostScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostScalarWhereInputSchema)
      .array()
      .optional(),
    publishedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z
      .union([
        z.lazy(() => EnumPostStatusFilterSchema),
        z.lazy(() => PostStatusSchema),
      ])
      .optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => CommentCreateWithoutAuthorInputSchema),
      z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),
    ]),
    update: z.union([
      z.lazy(() => CommentUpdateWithoutAuthorInputSchema),
      z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => CommentWhereUniqueInputSchema),
  });

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => CommentUpdateWithoutAuthorInputSchema),
      z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => CommentWhereUniqueInputSchema),
  });

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => CommentUpdateManyMutationInputSchema),
      z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorInputSchema),
    ]),
    where: z.lazy(() => CommentScalarWhereInputSchema),
  });

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CommentScalarWhereInputSchema),
        z.lazy(() => CommentScalarWhereInputSchema).array(),
      ])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => CommentScalarWhereInputSchema),
        z.lazy(() => CommentScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentScalarWhereInputSchema)
      .array()
      .optional(),
    postId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  z.strictObject({
    authenticators: z
      .lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
  z.strictObject({
    authenticators: z
      .lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
    where: z.lazy(() => UserWhereUniqueInputSchema),
  });

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
  z.strictObject({
    authenticators: z
      .lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  z.strictObject({
    authenticators: z
      .lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserCreateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuthenticatorsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUncheckedCreateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthenticatorsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserCreateOrConnectWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthenticatorsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema),
    ]),
    where: z.lazy(() => UserWhereUniqueInputSchema),
  });

export const UserUpsertWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuthenticatorsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuthenticatorsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuthenticatorsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthenticatorsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutPostsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
    ]),
    where: z.lazy(() => UserWhereUniqueInputSchema),
  });

export const CommentCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> =
  z.strictObject({
    author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> =
  z.strictObject({
    authorId: z.string(),
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => CommentCreateWithoutPostInputSchema),
      z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
    ]),
    where: z.lazy(() => CommentWhereUniqueInputSchema),
  });

export const CommentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => CommentCreateManyPostInputSchema),
      z.lazy(() => CommentCreateManyPostInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const PostTagCreateWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateWithoutPostInput> =
  z.strictObject({
    tag: z.lazy(() => TagCreateNestedOneWithoutPostsInputSchema),
  });

export const PostTagUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateWithoutPostInput> =
  z.strictObject({
    tagId: z.string(),
  });

export const PostTagCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateOrConnectWithoutPostInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostTagCreateWithoutPostInputSchema),
      z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),
    ]),
    where: z.lazy(() => PostTagWhereUniqueInputSchema),
  });

export const PostTagCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.PostTagCreateManyPostInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostTagCreateManyPostInputSchema),
      z.lazy(() => PostTagCreateManyPostInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutPostsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => UserUpdateWithoutPostsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => UserUpdateWithoutPostsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => CommentCreateWithoutPostInputSchema),
      z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
    ]),
    update: z.union([
      z.lazy(() => CommentUpdateWithoutPostInputSchema),
      z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema),
    ]),
    where: z.lazy(() => CommentWhereUniqueInputSchema),
  });

export const CommentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => CommentUpdateWithoutPostInputSchema),
      z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema),
    ]),
    where: z.lazy(() => CommentWhereUniqueInputSchema),
  });

export const CommentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => CommentUpdateManyMutationInputSchema),
      z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputSchema),
    ]),
    where: z.lazy(() => CommentScalarWhereInputSchema),
  });

export const PostTagUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostTagCreateWithoutPostInputSchema),
      z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),
    ]),
    update: z.union([
      z.lazy(() => PostTagUpdateWithoutPostInputSchema),
      z.lazy(() => PostTagUncheckedUpdateWithoutPostInputSchema),
    ]),
    where: z.lazy(() => PostTagWhereUniqueInputSchema),
  });

export const PostTagUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostTagUpdateWithoutPostInputSchema),
      z.lazy(() => PostTagUncheckedUpdateWithoutPostInputSchema),
    ]),
    where: z.lazy(() => PostTagWhereUniqueInputSchema),
  });

export const PostTagUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithWhereWithoutPostInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostTagUpdateManyMutationInputSchema),
      z.lazy(() => PostTagUncheckedUpdateManyWithoutPostInputSchema),
    ]),
    where: z.lazy(() => PostTagScalarWhereInputSchema),
  });

export const PostTagScalarWhereInputSchema: z.ZodType<Prisma.PostTagScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => PostTagScalarWhereInputSchema),
        z.lazy(() => PostTagScalarWhereInputSchema).array(),
      ])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostTagScalarWhereInputSchema),
        z.lazy(() => PostTagScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostTagScalarWhereInputSchema)
      .array()
      .optional(),
    postId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tagId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> =
  z.strictObject({
    author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    tags: z
      .lazy(() => PostTagCreateNestedManyWithoutPostInputSchema)
      .optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> =
  z.strictObject({
    authorId: z.string(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    tags: z
      .lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema)
      .optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostCreateWithoutCommentsInputSchema),
      z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
    ]),
    where: z.lazy(() => PostWhereUniqueInputSchema),
  });

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    id: z.cuid().optional(),
    image: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    posts: z
      .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    role: z.lazy(() => RoleSchema).optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutCommentsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
    ]),
    where: z.lazy(() => UserWhereUniqueInputSchema),
  });

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostCreateWithoutCommentsInputSchema),
      z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => PostUpdateWithoutCommentsInputSchema),
      z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema),
    ]),
    where: z.lazy(() => PostWhereInputSchema).optional(),
  });

export const PostUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostUpdateWithoutCommentsInputSchema),
      z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema),
    ]),
    where: z.lazy(() => PostWhereInputSchema).optional(),
  });

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> =
  z.strictObject({
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tags: z
      .lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tags: z
      .lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => UserCreateWithoutCommentsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => UserUpdateWithoutCommentsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => UserUpdateWithoutCommentsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> =
  z.strictObject({
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    authenticators: z
      .lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    posts: z
      .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostTagCreateWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateWithoutTagInput> =
  z.strictObject({
    post: z.lazy(() => PostCreateNestedOneWithoutTagsInputSchema),
  });

export const PostTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateWithoutTagInput> =
  z.strictObject({
    postId: z.string(),
  });

export const PostTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateOrConnectWithoutTagInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostTagCreateWithoutTagInputSchema),
      z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),
    ]),
    where: z.lazy(() => PostTagWhereUniqueInputSchema),
  });

export const PostTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.PostTagCreateManyTagInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostTagCreateManyTagInputSchema),
      z.lazy(() => PostTagCreateManyTagInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const PostTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostTagCreateWithoutTagInputSchema),
      z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),
    ]),
    update: z.union([
      z.lazy(() => PostTagUpdateWithoutTagInputSchema),
      z.lazy(() => PostTagUncheckedUpdateWithoutTagInputSchema),
    ]),
    where: z.lazy(() => PostTagWhereUniqueInputSchema),
  });

export const PostTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostTagUpdateWithoutTagInputSchema),
      z.lazy(() => PostTagUncheckedUpdateWithoutTagInputSchema),
    ]),
    where: z.lazy(() => PostTagWhereUniqueInputSchema),
  });

export const PostTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithWhereWithoutTagInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostTagUpdateManyMutationInputSchema),
      z.lazy(() => PostTagUncheckedUpdateManyWithoutTagInputSchema),
    ]),
    where: z.lazy(() => PostTagScalarWhereInputSchema),
  });

export const PostCreateWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateWithoutTagsInput> =
  z.strictObject({
    author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutPostInputSchema)
      .optional(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutTagsInput> =
  z.strictObject({
    authorId: z.string(),
    comments: z
      .lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema)
      .optional(),
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutTagsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostCreateWithoutTagsInputSchema),
      z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema),
    ]),
    where: z.lazy(() => PostWhereUniqueInputSchema),
  });

export const TagCreateWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateWithoutPostsInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    slug: z.string(),
  });

export const TagUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutPostsInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    slug: z.string(),
  });

export const TagCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutPostsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => TagCreateWithoutPostsInputSchema),
      z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema),
    ]),
    where: z.lazy(() => TagWhereUniqueInputSchema),
  });

export const PostUpsertWithoutTagsInputSchema: z.ZodType<Prisma.PostUpsertWithoutTagsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => PostCreateWithoutTagsInputSchema),
      z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => PostUpdateWithoutTagsInputSchema),
      z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema),
    ]),
    where: z.lazy(() => PostWhereInputSchema).optional(),
  });

export const PostUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutTagsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => PostUpdateWithoutTagsInputSchema),
      z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema),
    ]),
    where: z.lazy(() => PostWhereInputSchema).optional(),
  });

export const PostUpdateWithoutTagsInputSchema: z.ZodType<Prisma.PostUpdateWithoutTagsInput> =
  z.strictObject({
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutTagsInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const TagUpsertWithoutPostsInputSchema: z.ZodType<Prisma.TagUpsertWithoutPostsInput> =
  z.strictObject({
    create: z.union([
      z.lazy(() => TagCreateWithoutPostsInputSchema),
      z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema),
    ]),
    update: z.union([
      z.lazy(() => TagUpdateWithoutPostsInputSchema),
      z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema),
    ]),
    where: z.lazy(() => TagWhereInputSchema).optional(),
  });

export const TagUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutPostsInput> =
  z.strictObject({
    data: z.union([
      z.lazy(() => TagUpdateWithoutPostsInputSchema),
      z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema),
    ]),
    where: z.lazy(() => TagWhereInputSchema).optional(),
  });

export const TagUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TagUpdateWithoutPostsInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const TagUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutPostsInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AuthenticatorCreateManyUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateManyUserInput> =
  z.strictObject({
    counter: z.number().int(),
    credentialBackedUp: z.boolean(),
    credentialDeviceType: z.string(),
    credentialID: z.string(),
    credentialPublicKey: z.string(),
    providerAccountId: z.string(),
    transports: z.string().optional().nullable(),
  });

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z.strictObject({
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    id: z.cuid().optional(),
    id_token: z.string().optional().nullable(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    token_type: z.string().optional().nullable(),
    type: z.string(),
  });

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> =
  z.strictObject({
    content: z.string(),
    coverImage: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    excerpt: z.string().optional().nullable(),
    id: z.cuid().optional(),
    publishedAt: z.coerce.date().optional().nullable(),
    slug: z.string(),
    status: z.lazy(() => PostStatusSchema).optional(),
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> =
  z.strictObject({
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    postId: z.string(),
    updatedAt: z.coerce.date().optional(),
  });

export const AuthenticatorUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateWithoutUserInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const AuthenticatorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateWithoutUserInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const AuthenticatorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyWithoutUserInput> =
  z.strictObject({
    counter: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    credentialBackedUp: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialDeviceType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialID: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    credentialPublicKey: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    transports: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z.strictObject({
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> =
  z.strictObject({
    comments: z
      .lazy(() => CommentUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tags: z
      .lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> =
  z.strictObject({
    comments: z
      .lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tags: z
      .lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> =
  z.strictObject({
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    coverImage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    excerpt: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publishedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => PostStatusSchema),
        z.lazy(() => EnumPostStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> =
  z.strictObject({
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    post: z
      .lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema)
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> =
  z.strictObject({
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput> =
  z.strictObject({
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentCreateManyPostInputSchema: z.ZodType<Prisma.CommentCreateManyPostInput> =
  z.strictObject({
    authorId: z.string(),
    content: z.string(),
    createdAt: z.coerce.date().optional(),
    id: z.cuid().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const PostTagCreateManyPostInputSchema: z.ZodType<Prisma.PostTagCreateManyPostInput> =
  z.strictObject({
    tagId: z.string(),
  });

export const CommentUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPostInput> =
  z.strictObject({
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema)
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CommentUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostInput> =
  z.strictObject({
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const PostTagUpdateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateWithoutPostInput> =
  z.strictObject({
    tag: z
      .lazy(() => TagUpdateOneRequiredWithoutPostsNestedInputSchema)
      .optional(),
  });

export const PostTagUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateWithoutPostInput> =
  z.strictObject({
    tagId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostTagUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutPostInput> =
  z.strictObject({
    tagId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostTagCreateManyTagInputSchema: z.ZodType<Prisma.PostTagCreateManyTagInput> =
  z.strictObject({
    postId: z.string(),
  });

export const PostTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateWithoutTagInput> =
  z.strictObject({
    post: z
      .lazy(() => PostUpdateOneRequiredWithoutTagsNestedInputSchema)
      .optional(),
  });

export const PostTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateWithoutTagInput> =
  z.strictObject({
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const PostTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutTagInput> =
  z.strictObject({
    postId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    cursor: UserWhereUniqueInputSchema.optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
    include: UserIncludeSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: UserSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      cursor: UserWhereUniqueInputSchema.optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
      include: UserIncludeSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: UserSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: UserWhereInputSchema.optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    cursor: UserWhereUniqueInputSchema.optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
    include: UserIncludeSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: UserSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    cursor: UserWhereUniqueInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    include: UserIncludeSchema.optional(),
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      include: UserIncludeSchema.optional(),
      select: UserSelectSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      cursor: AccountWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: AccountIncludeSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: AccountSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      cursor: AccountWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: AccountIncludeSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: AccountSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      cursor: AccountWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: AccountIncludeSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: AccountSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      cursor: AccountWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: AccountWhereInputSchema.optional(),
  })
  .strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      include: AccountIncludeSchema.optional(),
      select: AccountSelectSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      include: AccountIncludeSchema.optional(),
      select: AccountSelectSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const AuthenticatorFindFirstArgsSchema: z.ZodType<Prisma.AuthenticatorFindFirstArgs> =
  z
    .object({
      cursor: AuthenticatorWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          AuthenticatorScalarFieldEnumSchema,
          AuthenticatorScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: AuthenticatorIncludeSchema.optional(),
      orderBy: z
        .union([
          AuthenticatorOrderByWithRelationInputSchema.array(),
          AuthenticatorOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: AuthenticatorSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthenticatorFindFirstOrThrowArgs> =
  z
    .object({
      cursor: AuthenticatorWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          AuthenticatorScalarFieldEnumSchema,
          AuthenticatorScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: AuthenticatorIncludeSchema.optional(),
      orderBy: z
        .union([
          AuthenticatorOrderByWithRelationInputSchema.array(),
          AuthenticatorOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: AuthenticatorSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorFindManyArgsSchema: z.ZodType<Prisma.AuthenticatorFindManyArgs> =
  z
    .object({
      cursor: AuthenticatorWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          AuthenticatorScalarFieldEnumSchema,
          AuthenticatorScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: AuthenticatorIncludeSchema.optional(),
      orderBy: z
        .union([
          AuthenticatorOrderByWithRelationInputSchema.array(),
          AuthenticatorOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: AuthenticatorSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorAggregateArgsSchema: z.ZodType<Prisma.AuthenticatorAggregateArgs> =
  z
    .object({
      cursor: AuthenticatorWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          AuthenticatorOrderByWithRelationInputSchema.array(),
          AuthenticatorOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorGroupByArgsSchema: z.ZodType<Prisma.AuthenticatorGroupByArgs> =
  z
    .object({
      by: AuthenticatorScalarFieldEnumSchema.array(),
      having: AuthenticatorScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          AuthenticatorOrderByWithAggregationInputSchema.array(),
          AuthenticatorOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorFindUniqueArgsSchema: z.ZodType<Prisma.AuthenticatorFindUniqueArgs> =
  z
    .object({
      include: AuthenticatorIncludeSchema.optional(),
      select: AuthenticatorSelectSchema.optional(),
      where: AuthenticatorWhereUniqueInputSchema,
    })
    .strict();

export const AuthenticatorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthenticatorFindUniqueOrThrowArgs> =
  z
    .object({
      include: AuthenticatorIncludeSchema.optional(),
      select: AuthenticatorSelectSchema.optional(),
      where: AuthenticatorWhereUniqueInputSchema,
    })
    .strict();

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z
  .object({
    cursor: PostWhereUniqueInputSchema.optional(),
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
    include: PostIncludeSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: PostSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> =
  z
    .object({
      cursor: PostWhereUniqueInputSchema.optional(),
      distinct: z
        .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
        .optional(),
      include: PostIncludeSchema.optional(),
      orderBy: z
        .union([
          PostOrderByWithRelationInputSchema.array(),
          PostOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PostSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PostWhereInputSchema.optional(),
    })
    .strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z
  .object({
    cursor: PostWhereUniqueInputSchema.optional(),
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
    include: PostIncludeSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: PostSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z
  .object({
    cursor: PostWhereUniqueInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z
  .object({
    by: PostScalarFieldEnumSchema.array(),
    having: PostScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithAggregationInputSchema.array(),
        PostOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z
  .object({
    include: PostIncludeSchema.optional(),
    select: PostSelectSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> =
  z
    .object({
      include: PostIncludeSchema.optional(),
      select: PostSelectSchema.optional(),
      where: PostWhereUniqueInputSchema,
    })
    .strict();

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> =
  z
    .object({
      cursor: CommentWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          CommentScalarFieldEnumSchema,
          CommentScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: CommentIncludeSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: CommentSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> =
  z
    .object({
      cursor: CommentWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          CommentScalarFieldEnumSchema,
          CommentScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: CommentIncludeSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: CommentSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> =
  z
    .object({
      cursor: CommentWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          CommentScalarFieldEnumSchema,
          CommentScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: CommentIncludeSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: CommentSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> =
  z
    .object({
      cursor: CommentWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z
  .object({
    by: CommentScalarFieldEnumSchema.array(),
    having: CommentScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        CommentOrderByWithAggregationInputSchema.array(),
        CommentOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: CommentWhereInputSchema.optional(),
  })
  .strict();

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> =
  z
    .object({
      include: CommentIncludeSchema.optional(),
      select: CommentSelectSchema.optional(),
      where: CommentWhereUniqueInputSchema,
    })
    .strict();

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> =
  z
    .object({
      include: CommentIncludeSchema.optional(),
      select: CommentSelectSchema.optional(),
      where: CommentWhereUniqueInputSchema,
    })
    .strict();

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z
  .object({
    cursor: TagWhereUniqueInputSchema.optional(),
    distinct: z
      .union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()])
      .optional(),
    include: TagIncludeSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithRelationInputSchema.array(),
        TagOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: TagSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> =
  z
    .object({
      cursor: TagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()])
        .optional(),
      include: TagIncludeSchema.optional(),
      orderBy: z
        .union([
          TagOrderByWithRelationInputSchema.array(),
          TagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: TagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: TagWhereInputSchema.optional(),
    })
    .strict();

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z
  .object({
    cursor: TagWhereUniqueInputSchema.optional(),
    distinct: z
      .union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()])
      .optional(),
    include: TagIncludeSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithRelationInputSchema.array(),
        TagOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: TagSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z
  .object({
    cursor: TagWhereUniqueInputSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithRelationInputSchema.array(),
        TagOrderByWithRelationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z
  .object({
    by: TagScalarFieldEnumSchema.array(),
    having: TagScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithAggregationInputSchema.array(),
        TagOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z
  .object({
    include: TagIncludeSchema.optional(),
    select: TagSelectSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> =
  z
    .object({
      include: TagIncludeSchema.optional(),
      select: TagSelectSchema.optional(),
      where: TagWhereUniqueInputSchema,
    })
    .strict();

export const PostTagFindFirstArgsSchema: z.ZodType<Prisma.PostTagFindFirstArgs> =
  z
    .object({
      cursor: PostTagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          PostTagScalarFieldEnumSchema,
          PostTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: PostTagIncludeSchema.optional(),
      orderBy: z
        .union([
          PostTagOrderByWithRelationInputSchema.array(),
          PostTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PostTagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();

export const PostTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostTagFindFirstOrThrowArgs> =
  z
    .object({
      cursor: PostTagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          PostTagScalarFieldEnumSchema,
          PostTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: PostTagIncludeSchema.optional(),
      orderBy: z
        .union([
          PostTagOrderByWithRelationInputSchema.array(),
          PostTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PostTagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();

export const PostTagFindManyArgsSchema: z.ZodType<Prisma.PostTagFindManyArgs> =
  z
    .object({
      cursor: PostTagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          PostTagScalarFieldEnumSchema,
          PostTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: PostTagIncludeSchema.optional(),
      orderBy: z
        .union([
          PostTagOrderByWithRelationInputSchema.array(),
          PostTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PostTagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();

export const PostTagAggregateArgsSchema: z.ZodType<Prisma.PostTagAggregateArgs> =
  z
    .object({
      cursor: PostTagWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          PostTagOrderByWithRelationInputSchema.array(),
          PostTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();

export const PostTagGroupByArgsSchema: z.ZodType<Prisma.PostTagGroupByArgs> = z
  .object({
    by: PostTagScalarFieldEnumSchema.array(),
    having: PostTagScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        PostTagOrderByWithAggregationInputSchema.array(),
        PostTagOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: PostTagWhereInputSchema.optional(),
  })
  .strict();

export const PostTagFindUniqueArgsSchema: z.ZodType<Prisma.PostTagFindUniqueArgs> =
  z
    .object({
      include: PostTagIncludeSchema.optional(),
      select: PostTagSelectSchema.optional(),
      where: PostTagWhereUniqueInputSchema,
    })
    .strict();

export const PostTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostTagFindUniqueOrThrowArgs> =
  z
    .object({
      include: PostTagIncludeSchema.optional(),
      select: PostTagSelectSchema.optional(),
      where: PostTagWhereUniqueInputSchema,
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    include: UserIncludeSchema.optional(),
    select: UserSelectSchema.optional(),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    include: UserIncludeSchema.optional(),
    select: UserSelectSchema.optional(),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    include: UserIncludeSchema.optional(),
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    include: UserIncludeSchema.optional(),
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    limit: z.number().optional(),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserUpdateManyMutationInputSchema,
        UserUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: UserWhereInputSchema.optional(),
    })
    .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    limit: z.number().optional(),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    include: AccountIncludeSchema.optional(),
    select: AccountSelectSchema.optional(),
  })
  .strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    include: AccountIncludeSchema.optional(),
    select: AccountSelectSchema.optional(),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    include: AccountIncludeSchema.optional(),
    select: AccountSelectSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    include: AccountIncludeSchema.optional(),
    select: AccountSelectSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      limit: z.number().optional(),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorCreateArgsSchema: z.ZodType<Prisma.AuthenticatorCreateArgs> =
  z
    .object({
      data: z.union([
        AuthenticatorCreateInputSchema,
        AuthenticatorUncheckedCreateInputSchema,
      ]),
      include: AuthenticatorIncludeSchema.optional(),
      select: AuthenticatorSelectSchema.optional(),
    })
    .strict();

export const AuthenticatorUpsertArgsSchema: z.ZodType<Prisma.AuthenticatorUpsertArgs> =
  z
    .object({
      create: z.union([
        AuthenticatorCreateInputSchema,
        AuthenticatorUncheckedCreateInputSchema,
      ]),
      include: AuthenticatorIncludeSchema.optional(),
      select: AuthenticatorSelectSchema.optional(),
      update: z.union([
        AuthenticatorUpdateInputSchema,
        AuthenticatorUncheckedUpdateInputSchema,
      ]),
      where: AuthenticatorWhereUniqueInputSchema,
    })
    .strict();

export const AuthenticatorCreateManyArgsSchema: z.ZodType<Prisma.AuthenticatorCreateManyArgs> =
  z
    .object({
      data: z.union([
        AuthenticatorCreateManyInputSchema,
        AuthenticatorCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AuthenticatorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthenticatorCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AuthenticatorCreateManyInputSchema,
        AuthenticatorCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AuthenticatorDeleteArgsSchema: z.ZodType<Prisma.AuthenticatorDeleteArgs> =
  z
    .object({
      include: AuthenticatorIncludeSchema.optional(),
      select: AuthenticatorSelectSchema.optional(),
      where: AuthenticatorWhereUniqueInputSchema,
    })
    .strict();

export const AuthenticatorUpdateArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateArgs> =
  z
    .object({
      data: z.union([
        AuthenticatorUpdateInputSchema,
        AuthenticatorUncheckedUpdateInputSchema,
      ]),
      include: AuthenticatorIncludeSchema.optional(),
      select: AuthenticatorSelectSchema.optional(),
      where: AuthenticatorWhereUniqueInputSchema,
    })
    .strict();

export const AuthenticatorUpdateManyArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AuthenticatorUpdateManyMutationInputSchema,
        AuthenticatorUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AuthenticatorUpdateManyMutationInputSchema,
        AuthenticatorUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const AuthenticatorDeleteManyArgsSchema: z.ZodType<Prisma.AuthenticatorDeleteManyArgs> =
  z
    .object({
      limit: z.number().optional(),
      where: AuthenticatorWhereInputSchema.optional(),
    })
    .strict();

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z
  .object({
    data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
    include: PostIncludeSchema.optional(),
    select: PostSelectSchema.optional(),
  })
  .strict();

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z
  .object({
    create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
    include: PostIncludeSchema.optional(),
    select: PostSelectSchema.optional(),
    update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z
  .object({
    data: z.union([
      PostCreateManyInputSchema,
      PostCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        PostCreateManyInputSchema,
        PostCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z
  .object({
    include: PostIncludeSchema.optional(),
    select: PostSelectSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z
  .object({
    data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
    include: PostIncludeSchema.optional(),
    select: PostSelectSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z
  .object({
    data: z.union([
      PostUpdateManyMutationInputSchema,
      PostUncheckedUpdateManyInputSchema,
    ]),
    limit: z.number().optional(),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        PostUpdateManyMutationInputSchema,
        PostUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: PostWhereInputSchema.optional(),
    })
    .strict();

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z
  .object({
    limit: z.number().optional(),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z
  .object({
    data: z.union([
      CommentCreateInputSchema,
      CommentUncheckedCreateInputSchema,
    ]),
    include: CommentIncludeSchema.optional(),
    select: CommentSelectSchema.optional(),
  })
  .strict();

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z
  .object({
    create: z.union([
      CommentCreateInputSchema,
      CommentUncheckedCreateInputSchema,
    ]),
    include: CommentIncludeSchema.optional(),
    select: CommentSelectSchema.optional(),
    update: z.union([
      CommentUpdateInputSchema,
      CommentUncheckedUpdateInputSchema,
    ]),
    where: CommentWhereUniqueInputSchema,
  })
  .strict();

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> =
  z
    .object({
      data: z.union([
        CommentCreateManyInputSchema,
        CommentCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        CommentCreateManyInputSchema,
        CommentCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z
  .object({
    include: CommentIncludeSchema.optional(),
    select: CommentSelectSchema.optional(),
    where: CommentWhereUniqueInputSchema,
  })
  .strict();

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z
  .object({
    data: z.union([
      CommentUpdateInputSchema,
      CommentUncheckedUpdateInputSchema,
    ]),
    include: CommentIncludeSchema.optional(),
    select: CommentSelectSchema.optional(),
    where: CommentWhereUniqueInputSchema,
  })
  .strict();

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CommentUpdateManyMutationInputSchema,
        CommentUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        CommentUpdateManyMutationInputSchema,
        CommentUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> =
  z
    .object({
      limit: z.number().optional(),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z
  .object({
    data: z.union([TagCreateInputSchema, TagUncheckedCreateInputSchema]),
    include: TagIncludeSchema.optional(),
    select: TagSelectSchema.optional(),
  })
  .strict();

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z
  .object({
    create: z.union([TagCreateInputSchema, TagUncheckedCreateInputSchema]),
    include: TagIncludeSchema.optional(),
    select: TagSelectSchema.optional(),
    update: z.union([TagUpdateInputSchema, TagUncheckedUpdateInputSchema]),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z
  .object({
    data: z.union([TagCreateManyInputSchema, TagCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        TagCreateManyInputSchema,
        TagCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z
  .object({
    include: TagIncludeSchema.optional(),
    select: TagSelectSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z
  .object({
    data: z.union([TagUpdateInputSchema, TagUncheckedUpdateInputSchema]),
    include: TagIncludeSchema.optional(),
    select: TagSelectSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z
  .object({
    data: z.union([
      TagUpdateManyMutationInputSchema,
      TagUncheckedUpdateManyInputSchema,
    ]),
    limit: z.number().optional(),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        TagUpdateManyMutationInputSchema,
        TagUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: TagWhereInputSchema.optional(),
    })
    .strict();

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z
  .object({
    limit: z.number().optional(),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const PostTagCreateArgsSchema: z.ZodType<Prisma.PostTagCreateArgs> = z
  .object({
    data: z.union([
      PostTagCreateInputSchema,
      PostTagUncheckedCreateInputSchema,
    ]),
    include: PostTagIncludeSchema.optional(),
    select: PostTagSelectSchema.optional(),
  })
  .strict();

export const PostTagUpsertArgsSchema: z.ZodType<Prisma.PostTagUpsertArgs> = z
  .object({
    create: z.union([
      PostTagCreateInputSchema,
      PostTagUncheckedCreateInputSchema,
    ]),
    include: PostTagIncludeSchema.optional(),
    select: PostTagSelectSchema.optional(),
    update: z.union([
      PostTagUpdateInputSchema,
      PostTagUncheckedUpdateInputSchema,
    ]),
    where: PostTagWhereUniqueInputSchema,
  })
  .strict();

export const PostTagCreateManyArgsSchema: z.ZodType<Prisma.PostTagCreateManyArgs> =
  z
    .object({
      data: z.union([
        PostTagCreateManyInputSchema,
        PostTagCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostTagCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        PostTagCreateManyInputSchema,
        PostTagCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostTagDeleteArgsSchema: z.ZodType<Prisma.PostTagDeleteArgs> = z
  .object({
    include: PostTagIncludeSchema.optional(),
    select: PostTagSelectSchema.optional(),
    where: PostTagWhereUniqueInputSchema,
  })
  .strict();

export const PostTagUpdateArgsSchema: z.ZodType<Prisma.PostTagUpdateArgs> = z
  .object({
    data: z.union([
      PostTagUpdateInputSchema,
      PostTagUncheckedUpdateInputSchema,
    ]),
    include: PostTagIncludeSchema.optional(),
    select: PostTagSelectSchema.optional(),
    where: PostTagWhereUniqueInputSchema,
  })
  .strict();

export const PostTagUpdateManyArgsSchema: z.ZodType<Prisma.PostTagUpdateManyArgs> =
  z
    .object({
      data: z.union([
        PostTagUpdateManyMutationInputSchema,
        PostTagUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();

export const PostTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostTagUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        PostTagUpdateManyMutationInputSchema,
        PostTagUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();

export const PostTagDeleteManyArgsSchema: z.ZodType<Prisma.PostTagDeleteManyArgs> =
  z
    .object({
      limit: z.number().optional(),
      where: PostTagWhereInputSchema.optional(),
    })
    .strict();
