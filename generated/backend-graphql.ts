import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CategoryFilter = {
  __typename?: 'CategoryFilter';
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};

export enum CategoryProduct {
  Food = 'food',
  Sport = 'sport',
  Masterclass = 'masterclass'
}

export type CreateProductDateInput = {
  task_id: Scalars['Int'];
  active_date?: Maybe<Scalars['String']>;
};

export type CreateProductImageInput = {
  id?: Maybe<Scalars['Int']>;
  task_id?: Maybe<Scalars['Int']>;
  product_image?: Maybe<Scalars['String']>;
  image_type?: Maybe<ImageType>;
};

export type CreateProductInput = {
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  desc_tour: Scalars['String'];
  location: Scalars['String'];
  product_image?: Maybe<Scalars['String']>;
  category?: Maybe<CategoryProduct>;
  price: Scalars['Int'];
};

export enum ImageType {
  Main = 'main',
  Additional = 'additional'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<Product>;
  createProductDate?: Maybe<ProductDate>;
  createProductImage?: Maybe<ProductImage>;
  createImages?: Maybe<Array<Maybe<ProductImages>>>;
  updateProduct?: Maybe<Product>;
  deleteProductDate: ProductDate;
  deleteProductImage: ProductImage;
  updateImageType?: Maybe<ProductImage>;
  updateProductImages?: Maybe<ProductImage>;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductDateArgs = {
  input: CreateProductDateInput;
};


export type MutationCreateProductImageArgs = {
  input: CreateProductImageInput;
};


export type MutationCreateImagesArgs = {
  input: Array<CreateProductImageInput>;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationDeleteProductDateArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProductImageArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateImageTypeArgs = {
  input: UpdateImageTypeInput;
};


export type MutationUpdateProductImagesArgs = {
  input: UpdateImageInput;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  title: Scalars['String'];
  price: Scalars['Int'];
  desc_tour: Scalars['String'];
  location: Scalars['String'];
  category?: Maybe<CategoryProduct>;
  image_type?: Maybe<ImageType>;
  dates?: Maybe<Array<Maybe<ProductDate>>>;
  product_image?: Maybe<Scalars['String']>;
};

export type ProductDate = {
  __typename?: 'ProductDate';
  id?: Maybe<Scalars['Int']>;
  task_id?: Maybe<Scalars['Int']>;
  active_date?: Maybe<Scalars['String']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  id?: Maybe<Scalars['Int']>;
  task_id?: Maybe<Scalars['Int']>;
  product_image?: Maybe<Scalars['String']>;
  image_type?: Maybe<ImageType>;
};

export type ProductImages = {
  __typename?: 'ProductImages';
  id?: Maybe<Scalars['Int']>;
  src?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
  task_id?: Maybe<Scalars['Int']>;
  product_image?: Maybe<Scalars['String']>;
  image_type?: Maybe<ImageType>;
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  product?: Maybe<Product>;
  productDate?: Maybe<ProductDate>;
  productDates: Array<ProductDate>;
  productImages: Array<ProductImage>;
};


export type QueryProductsArgs = {
  category?: Maybe<CategoryProduct>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryProductDateArgs = {
  id: Scalars['Int'];
};


export type QueryProductDatesArgs = {
  id: Scalars['Int'];
};


export type QueryProductImagesArgs = {
  id: Scalars['Int'];
};

export type UpdateImageInput = {
  id: Scalars['Int'];
  task_id: Scalars['Int'];
  product_image?: Maybe<Scalars['String']>;
  image_type?: Maybe<ImageType>;
};

export type UpdateImageTypeInput = {
  id: Scalars['Int'];
  image_type?: Maybe<ImageType>;
};

export type UpdateProductInput = {
  id: Scalars['Int'];
  title: Scalars['String'];
  desc_tour: Scalars['String'];
  location: Scalars['String'];
  category?: Maybe<CategoryProduct>;
  price: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CategoryFilter: ResolverTypeWrapper<CategoryFilter>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CategoryProduct: CategoryProduct;
  CreateProductDateInput: CreateProductDateInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateProductImageInput: CreateProductImageInput;
  CreateProductInput: CreateProductInput;
  ImageType: ImageType;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductDate: ResolverTypeWrapper<ProductDate>;
  ProductImage: ResolverTypeWrapper<ProductImage>;
  ProductImages: ResolverTypeWrapper<ProductImages>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  UpdateImageInput: UpdateImageInput;
  UpdateImageTypeInput: UpdateImageTypeInput;
  UpdateProductInput: UpdateProductInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CategoryFilter: CategoryFilter;
  Int: Scalars['Int'];
  CreateProductDateInput: CreateProductDateInput;
  String: Scalars['String'];
  CreateProductImageInput: CreateProductImageInput;
  CreateProductInput: CreateProductInput;
  Mutation: {};
  Product: Product;
  ProductDate: ProductDate;
  ProductImage: ProductImage;
  ProductImages: ProductImages;
  Boolean: Scalars['Boolean'];
  Query: {};
  UpdateImageInput: UpdateImageInput;
  UpdateImageTypeInput: UpdateImageTypeInput;
  UpdateProductInput: UpdateProductInput;
};

export type CategoryFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryFilter'] = ResolversParentTypes['CategoryFilter']> = {
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createProductDate?: Resolver<Maybe<ResolversTypes['ProductDate']>, ParentType, ContextType, RequireFields<MutationCreateProductDateArgs, 'input'>>;
  createProductImage?: Resolver<Maybe<ResolversTypes['ProductImage']>, ParentType, ContextType, RequireFields<MutationCreateProductImageArgs, 'input'>>;
  createImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductImages']>>>, ParentType, ContextType, RequireFields<MutationCreateImagesArgs, 'input'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'input'>>;
  deleteProductDate?: Resolver<ResolversTypes['ProductDate'], ParentType, ContextType, RequireFields<MutationDeleteProductDateArgs, 'id'>>;
  deleteProductImage?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType, RequireFields<MutationDeleteProductImageArgs, 'id'>>;
  updateImageType?: Resolver<Maybe<ResolversTypes['ProductImage']>, ParentType, ContextType, RequireFields<MutationUpdateImageTypeArgs, 'input'>>;
  updateProductImages?: Resolver<Maybe<ResolversTypes['ProductImage']>, ParentType, ContextType, RequireFields<MutationUpdateProductImagesArgs, 'input'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  desc_tour?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['CategoryProduct']>, ParentType, ContextType>;
  image_type?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  dates?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductDate']>>>, ParentType, ContextType>;
  product_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductDate'] = ResolversParentTypes['ProductDate']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  active_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductImage'] = ResolversParentTypes['ProductImage']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_type?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductImages'] = ResolversParentTypes['ProductImages']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  src?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isMain?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_type?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsArgs, never>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  productDate?: Resolver<Maybe<ResolversTypes['ProductDate']>, ParentType, ContextType, RequireFields<QueryProductDateArgs, 'id'>>;
  productDates?: Resolver<Array<ResolversTypes['ProductDate']>, ParentType, ContextType, RequireFields<QueryProductDatesArgs, 'id'>>;
  productImages?: Resolver<Array<ResolversTypes['ProductImage']>, ParentType, ContextType, RequireFields<QueryProductImagesArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  CategoryFilter?: CategoryFilterResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductDate?: ProductDateResolvers<ContextType>;
  ProductImage?: ProductImageResolvers<ContextType>;
  ProductImages?: ProductImagesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
