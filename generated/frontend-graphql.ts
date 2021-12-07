import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type CreateImagesMutationVariables = Exact<{
  input: Array<CreateProductImageInput> | CreateProductImageInput;
}>;


export type CreateImagesMutation = (
  { __typename?: 'Mutation' }
  & { createImages?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImages' }
    & Pick<ProductImages, 'id' | 'task_id' | 'product_image' | 'image_type'>
  )>>> }
);

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'price' | 'title' | 'desc_tour' | 'category' | 'location'>
  )> }
);

export type CreateProductDateMutationVariables = Exact<{
  input: CreateProductDateInput;
}>;


export type CreateProductDateMutation = (
  { __typename?: 'Mutation' }
  & { createProductDate?: Maybe<(
    { __typename?: 'ProductDate' }
    & Pick<ProductDate, 'id' | 'task_id' | 'active_date'>
  )> }
);

export type CreateProductImageMutationVariables = Exact<{
  input: CreateProductImageInput;
}>;


export type CreateProductImageMutation = (
  { __typename?: 'Mutation' }
  & { createProductImage?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'task_id' | 'image_type' | 'product_image'>
  )> }
);

export type ProductDatesQueryVariables = Exact<{
  task_id: Scalars['Int'];
}>;


export type ProductDatesQuery = (
  { __typename?: 'Query' }
  & { productDates: Array<(
    { __typename?: 'ProductDate' }
    & Pick<ProductDate, 'id' | 'task_id' | 'active_date'>
  )> }
);

export type DeleteProductDateMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProductDateMutation = (
  { __typename?: 'Mutation' }
  & { deleteProductDate: (
    { __typename?: 'ProductDate' }
    & Pick<ProductDate, 'id' | 'task_id' | 'active_date'>
  ) }
);

export type DeleteProductImageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProductImageMutation = (
  { __typename?: 'Mutation' }
  & { deleteProductImage: (
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'id' | 'task_id' | 'product_image' | 'image_type'>
  ) }
);

export type ProductImagesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductImagesQuery = (
  { __typename?: 'Query' }
  & { productImages: Array<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'id' | 'task_id' | 'product_image' | 'image_type'>
  )> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'title' | 'desc_tour' | 'price' | 'location' | 'category'>
    & { dates?: Maybe<Array<Maybe<(
      { __typename?: 'ProductDate' }
      & Pick<ProductDate, 'id' | 'task_id' | 'active_date'>
    )>>> }
  )> }
);

export type ProductsQueryVariables = Exact<{
  category?: Maybe<CategoryProduct>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'price' | 'desc_tour' | 'location' | 'product_image' | 'image_type' | 'category'>
    & { dates?: Maybe<Array<Maybe<(
      { __typename?: 'ProductDate' }
      & Pick<ProductDate, 'id' | 'task_id' | 'active_date'>
    )>>> }
  )> }
);

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'desc_tour' | 'location' | 'category' | 'price'>
  )> }
);

export type UpdateImageTypeMutationVariables = Exact<{
  input: UpdateImageTypeInput;
}>;


export type UpdateImageTypeMutation = (
  { __typename?: 'Mutation' }
  & { updateImageType?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'id' | 'task_id' | 'product_image' | 'image_type'>
  )> }
);

export type UpdateProductImagesMutationVariables = Exact<{
  input: UpdateImageInput;
}>;


export type UpdateProductImagesMutation = (
  { __typename?: 'Mutation' }
  & { updateProductImages?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'id' | 'task_id' | 'product_image' | 'image_type'>
  )> }
);


export const CreateImagesDocument = gql`
    mutation CreateImages($input: [CreateProductImageInput!]!) {
  createImages(input: $input) {
    id
    task_id
    product_image
    image_type
  }
}
    `;
export type CreateImagesMutationFn = Apollo.MutationFunction<CreateImagesMutation, CreateImagesMutationVariables>;

/**
 * __useCreateImagesMutation__
 *
 * To run a mutation, you first call `useCreateImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImagesMutation, { data, loading, error }] = useCreateImagesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateImagesMutation(baseOptions?: Apollo.MutationHookOptions<CreateImagesMutation, CreateImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImagesMutation, CreateImagesMutationVariables>(CreateImagesDocument, options);
      }
export type CreateImagesMutationHookResult = ReturnType<typeof useCreateImagesMutation>;
export type CreateImagesMutationResult = Apollo.MutationResult<CreateImagesMutation>;
export type CreateImagesMutationOptions = Apollo.BaseMutationOptions<CreateImagesMutation, CreateImagesMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    price
    title
    desc_tour
    category
    location
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateProductDateDocument = gql`
    mutation CreateProductDate($input: CreateProductDateInput!) {
  createProductDate(input: $input) {
    id
    task_id
    active_date
  }
}
    `;
export type CreateProductDateMutationFn = Apollo.MutationFunction<CreateProductDateMutation, CreateProductDateMutationVariables>;

/**
 * __useCreateProductDateMutation__
 *
 * To run a mutation, you first call `useCreateProductDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductDateMutation, { data, loading, error }] = useCreateProductDateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductDateMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductDateMutation, CreateProductDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductDateMutation, CreateProductDateMutationVariables>(CreateProductDateDocument, options);
      }
export type CreateProductDateMutationHookResult = ReturnType<typeof useCreateProductDateMutation>;
export type CreateProductDateMutationResult = Apollo.MutationResult<CreateProductDateMutation>;
export type CreateProductDateMutationOptions = Apollo.BaseMutationOptions<CreateProductDateMutation, CreateProductDateMutationVariables>;
export const CreateProductImageDocument = gql`
    mutation CreateProductImage($input: CreateProductImageInput!) {
  createProductImage(input: $input) {
    task_id
    image_type
    product_image
  }
}
    `;
export type CreateProductImageMutationFn = Apollo.MutationFunction<CreateProductImageMutation, CreateProductImageMutationVariables>;

/**
 * __useCreateProductImageMutation__
 *
 * To run a mutation, you first call `useCreateProductImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductImageMutation, { data, loading, error }] = useCreateProductImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductImageMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductImageMutation, CreateProductImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductImageMutation, CreateProductImageMutationVariables>(CreateProductImageDocument, options);
      }
export type CreateProductImageMutationHookResult = ReturnType<typeof useCreateProductImageMutation>;
export type CreateProductImageMutationResult = Apollo.MutationResult<CreateProductImageMutation>;
export type CreateProductImageMutationOptions = Apollo.BaseMutationOptions<CreateProductImageMutation, CreateProductImageMutationVariables>;
export const ProductDatesDocument = gql`
    query ProductDates($task_id: Int!) {
  productDates(id: $task_id) {
    id
    task_id
    active_date
  }
}
    `;

/**
 * __useProductDatesQuery__
 *
 * To run a query within a React component, call `useProductDatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDatesQuery({
 *   variables: {
 *      task_id: // value for 'task_id'
 *   },
 * });
 */
export function useProductDatesQuery(baseOptions: Apollo.QueryHookOptions<ProductDatesQuery, ProductDatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDatesQuery, ProductDatesQueryVariables>(ProductDatesDocument, options);
      }
export function useProductDatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDatesQuery, ProductDatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDatesQuery, ProductDatesQueryVariables>(ProductDatesDocument, options);
        }
export type ProductDatesQueryHookResult = ReturnType<typeof useProductDatesQuery>;
export type ProductDatesLazyQueryHookResult = ReturnType<typeof useProductDatesLazyQuery>;
export type ProductDatesQueryResult = Apollo.QueryResult<ProductDatesQuery, ProductDatesQueryVariables>;
export const DeleteProductDateDocument = gql`
    mutation DeleteProductDate($id: Int!) {
  deleteProductDate(id: $id) {
    id
    task_id
    active_date
  }
}
    `;
export type DeleteProductDateMutationFn = Apollo.MutationFunction<DeleteProductDateMutation, DeleteProductDateMutationVariables>;

/**
 * __useDeleteProductDateMutation__
 *
 * To run a mutation, you first call `useDeleteProductDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductDateMutation, { data, loading, error }] = useDeleteProductDateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductDateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductDateMutation, DeleteProductDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductDateMutation, DeleteProductDateMutationVariables>(DeleteProductDateDocument, options);
      }
export type DeleteProductDateMutationHookResult = ReturnType<typeof useDeleteProductDateMutation>;
export type DeleteProductDateMutationResult = Apollo.MutationResult<DeleteProductDateMutation>;
export type DeleteProductDateMutationOptions = Apollo.BaseMutationOptions<DeleteProductDateMutation, DeleteProductDateMutationVariables>;
export const DeleteProductImageDocument = gql`
    mutation DeleteProductImage($id: Int!) {
  deleteProductImage(id: $id) {
    id
    task_id
    product_image
    image_type
  }
}
    `;
export type DeleteProductImageMutationFn = Apollo.MutationFunction<DeleteProductImageMutation, DeleteProductImageMutationVariables>;

/**
 * __useDeleteProductImageMutation__
 *
 * To run a mutation, you first call `useDeleteProductImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductImageMutation, { data, loading, error }] = useDeleteProductImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductImageMutation, DeleteProductImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductImageMutation, DeleteProductImageMutationVariables>(DeleteProductImageDocument, options);
      }
export type DeleteProductImageMutationHookResult = ReturnType<typeof useDeleteProductImageMutation>;
export type DeleteProductImageMutationResult = Apollo.MutationResult<DeleteProductImageMutation>;
export type DeleteProductImageMutationOptions = Apollo.BaseMutationOptions<DeleteProductImageMutation, DeleteProductImageMutationVariables>;
export const ProductImagesDocument = gql`
    query ProductImages($id: Int!) {
  productImages(id: $id) {
    id
    task_id
    product_image
    image_type
  }
}
    `;

/**
 * __useProductImagesQuery__
 *
 * To run a query within a React component, call `useProductImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductImagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductImagesQuery(baseOptions: Apollo.QueryHookOptions<ProductImagesQuery, ProductImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductImagesQuery, ProductImagesQueryVariables>(ProductImagesDocument, options);
      }
export function useProductImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductImagesQuery, ProductImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductImagesQuery, ProductImagesQueryVariables>(ProductImagesDocument, options);
        }
export type ProductImagesQueryHookResult = ReturnType<typeof useProductImagesQuery>;
export type ProductImagesLazyQueryHookResult = ReturnType<typeof useProductImagesLazyQuery>;
export type ProductImagesQueryResult = Apollo.QueryResult<ProductImagesQuery, ProductImagesQueryVariables>;
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    title
    desc_tour
    price
    location
    category
    dates {
      id
      task_id
      active_date
    }
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products($category: CategoryProduct, $limit: Int, $offset: Int) {
  products(category: $category, limit: $limit, offset: $offset) {
    id
    title
    price
    desc_tour
    location
    product_image
    image_type
    category
    dates {
      id
      task_id
      active_date
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      category: // value for 'category'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    id
    title
    desc_tour
    location
    category
    price
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateImageTypeDocument = gql`
    mutation UpdateImageType($input: UpdateImageTypeInput!) {
  updateImageType(input: $input) {
    id
    task_id
    product_image
    image_type
  }
}
    `;
export type UpdateImageTypeMutationFn = Apollo.MutationFunction<UpdateImageTypeMutation, UpdateImageTypeMutationVariables>;

/**
 * __useUpdateImageTypeMutation__
 *
 * To run a mutation, you first call `useUpdateImageTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImageTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImageTypeMutation, { data, loading, error }] = useUpdateImageTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateImageTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImageTypeMutation, UpdateImageTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateImageTypeMutation, UpdateImageTypeMutationVariables>(UpdateImageTypeDocument, options);
      }
export type UpdateImageTypeMutationHookResult = ReturnType<typeof useUpdateImageTypeMutation>;
export type UpdateImageTypeMutationResult = Apollo.MutationResult<UpdateImageTypeMutation>;
export type UpdateImageTypeMutationOptions = Apollo.BaseMutationOptions<UpdateImageTypeMutation, UpdateImageTypeMutationVariables>;
export const UpdateProductImagesDocument = gql`
    mutation UpdateProductImages($input: UpdateImageInput!) {
  updateProductImages(input: $input) {
    id
    task_id
    product_image
    image_type
  }
}
    `;
export type UpdateProductImagesMutationFn = Apollo.MutationFunction<UpdateProductImagesMutation, UpdateProductImagesMutationVariables>;

/**
 * __useUpdateProductImagesMutation__
 *
 * To run a mutation, you first call `useUpdateProductImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductImagesMutation, { data, loading, error }] = useUpdateProductImagesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductImagesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductImagesMutation, UpdateProductImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductImagesMutation, UpdateProductImagesMutationVariables>(UpdateProductImagesDocument, options);
      }
export type UpdateProductImagesMutationHookResult = ReturnType<typeof useUpdateProductImagesMutation>;
export type UpdateProductImagesMutationResult = Apollo.MutationResult<UpdateProductImagesMutation>;
export type UpdateProductImagesMutationOptions = Apollo.BaseMutationOptions<UpdateProductImagesMutation, UpdateProductImagesMutationVariables>;