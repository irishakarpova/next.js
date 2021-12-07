import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  enum ImageType {
    main
    additional
  }
  enum CategoryProduct {
    food
    sport
    masterclass
  }
  type CategoryFilter {
    offset: Int!
    limit: Int!
  }

  type Product {
    id: Int!
    title: String!
    price: Int!
    desc_tour: String!
    location: String!
    category: CategoryProduct
    image_type: ImageType
    dates: [ProductDate]
    product_image: String
  }

  type ProductDate {
    id: Int
    task_id: Int
    active_date: String
  }
  type ProductImage {
    id: Int
    task_id: Int
    product_image: String
    image_type: ImageType
  }
  type ProductImages {
    id: Int
    src: String
    isMain: Boolean
    task_id: Int
    product_image: String
    image_type: ImageType
  }

  input CreateProductInput {
    id: Int
    title: String!
    desc_tour: String!
    location: String!
    product_image: String
    category: CategoryProduct
    price: Int!
  }
  input CreateProductDateInput {
    task_id: Int!
    active_date: String
  }

  input CreateProductImageInput {
    id: Int
    task_id: Int
    product_image: String
    image_type: ImageType
  }
  input UpdateImageInput {
    id: Int!
    task_id: Int!
    product_image: String
    image_type: ImageType
  }

  input UpdateProductInput {
    id: Int!
    title: String!
    desc_tour: String!
    location: String!
    category: CategoryProduct
    price: Int!
  }
  input UpdateImageTypeInput {
    id: Int!
    image_type: ImageType
  }

  type Query {
    product(id: Int!): Product
    products(category: CategoryProduct, limit: Int, offset: Int): [Product!]!
    productDate(id: Int!): ProductDate
    productDates(id: Int!): [ProductDate!]!
    productImages(id: Int!): [ProductImage!]!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    createProductDate(input: CreateProductDateInput!): ProductDate
    createProductImage(input: CreateProductImageInput!): ProductImage
    createImages(input: [CreateProductImageInput!]!): [ProductImages]
    updateProduct(input: UpdateProductInput!): Product
    updateImageType(input: UpdateImageTypeInput!): ProductImage
    updateProductImages(input: UpdateImageInput!): ProductImage
    deleteProductDate(id: Int!): ProductDate!
    deleteProductImage(id: Int!): ProductImage!
  }
`;
