import {
  CategoryProduct,
  ImageType,
  Resolvers,
  ProductDate,
  ProductImage,
  ProductImages
} from "../generated/backend-graphql";
import { ServerlessMysql } from "serverless-mysql";
import { OkPacket } from "mysql";
import { UserInputError } from "apollo-server-micro";

interface ApolloContext {
  db: ServerlessMysql;
}

interface ProductDbRow {
  id: number;
  title: string;
  desc_tour: string;
  price: number;
  image_type: ImageType;
  dateId: number;
  active_date: string;
  task_id: number;
  location: string;
  product_image: string;
  category: CategoryProduct;
}
interface ProductImageDbRow {
  id: number;
  product_image: string;
  task_id: number;
  image_type: ImageType;
}
interface ProductDateDbRow {
  id: number;
  active_date: string;
  task_id: number;
}
interface ProducPGroup<PGroup> {
  [id: number]: PGroup;
}
type ProductImageDbQueryRezult = ProductImageDbRow[];
type ProductImagesDbQueryRezult = ProductImageDbRow[];

type ProductsDateDbQueryRezult = ProductDateDbRow[];
type ProductDateDbQueryRezult = ProductDateDbRow[];

type ProductsDbQueryRezult = ProductDbRow[];
type ProductDbQueryRezult = ProductDbRow[];

const getProductImageById = async (id: number, db: ServerlessMysql) => {
  const tourimages = await db.query<ProductImageDbQueryRezult>(
    "SELECT id, task_id, product_image, image_type FROM tourimages WHERE id = ?",
    [id]
  );
  return tourimages.length
    ? {
        id: tourimages[0].id,
        task_id: tourimages[0].task_id,
        product_image: tourimages[0].product_image,
        image_type: tourimages[0].image_type
      }
    : null;
};

const getProductDateById = async (id: number, db: ServerlessMysql) => {
  const dates = await db.query<ProductDateDbQueryRezult>(
    "SELECT id, task_id, active_date FROM dates WHERE id = ?",
    [id]
  );
  return dates.length
    ? {
        id: dates[0].id,
        task_id: dates[0].task_id,
        active_date: dates[0].active_date
      }
    : null;
};
const getProductById = async (id: number, db: ServerlessMysql) => {
  const products = await db.query<ProductDbQueryRezult>(
    "SELECT id, title, desc_tour, price, location, category FROM products WHERE id = ?",
    [id]
  );
  return products.length
    ? {
        id: products[0].id,
        title: products[0].title,
        price: products[0].price,
        desc_tour: products[0].desc_tour,
        location: products[0].location,
        category: products[0].category
      }
    : null;
};
const getProductImages = async (task_id: number, db: ServerlessMysql) => {
  const dates = await db.query<ProductImageDbQueryRezult>(
    "SELECT id, task_id, product_image, image_type FROM tourimages WHERE task_id = ?",
    [task_id]
  );

  let result: ProductImage[] = [];
  dates.map((d) => {
    result.push({
      id: d.id,
      task_id: d.task_id,
      product_image: d.product_image,
      image_type: d.image_type
    });
  });
  return result;
};
const getProductDatesById = async (task_id: number, db: ServerlessMysql) => {
  const taskDates = await db.query<ProductsDateDbQueryRezult>(
    "SELECT id, active_date, task_id FROM dates WHERE task_id = ? ",
    [task_id]
  );

  let rezult: ProductDate[] = [];
  taskDates.map((d) => {
    rezult.push({
      id: d.id,
      active_date: d.active_date,
      task_id: d.task_id
    });
  });
  return rezult;
};
export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    async products(parent, args, context) {
      const { category, limit, offset } = args;
      const queryParams: string[] = [];
      let query =
        "SELECT t.id, t.title, t.price, t.category, t.desc_tour, t.location, td.id  dateId, td.active_date, td.task_id, im.id imageId, im.product_image, im.image_type FROM products t";
      query += " LEFT JOIN dates td ON td.task_id = t.id";
      query +=
        " LEFT JOIN tourimages im ON im.task_id = t.id AND im.image_type='main' ";
      if (category) {
        query += "WHERE category = ?";
        queryParams.push(category);
      }
      if (limit) {
        query += " LIMIT " + limit;
      }
      if (offset) {
        query += " OFFSET " + offset;
      }
      const products = await context.db.query<ProductsDbQueryRezult>(
        query,
        queryParams
      );
      await context.db.end();
      let productsGroup: ProducPGroup<any> = {};
      products.map(
        ({
          id,
          title,
          desc_tour,
          location,
          dateId,
          active_date,
          task_id,
          product_image,
          image_type,
          category,
          price
        }) => {
          if (!productsGroup[id]) {
            productsGroup[id] = {
              id,
              title,
              desc_tour,
              location,
              product_image,
              image_type,
              category,
              price,
              dates: []
            };
          }
          productsGroup[id].dates.push({
            id: dateId,
            active_date,
            task_id
          });
        }
      );
      let rezult = Object.values(productsGroup);
      return rezult;
    },
    async productDates(parent, args, context) {
      return await getProductDatesById(args.id, context.db);
    },
    async productImages(parent, args, context) {
      return await getProductImages(args.id, context.db);
    },
    async product(parent, args, context) {
      return await getProductById(args.id, context.db);
    },
    async productDate(parent, args, context) {
      return await getProductDateById(args.id, context.db);
    }
  },

  Mutation: {
    async createProduct(parent, args, context) {
      const result = await context.db.query<OkPacket>(
        "INSERT INTO products (title, price, category, desc_tour, location) VALUES(?, ?, ?, ?, ?)",
        [
          args.input.title,
          args.input.price,
          args.input.category,
          args.input.desc_tour,
          args.input.location
        ]
      );

      const errors: { property: string; message: string }[] = [];
      if (!args.input.title) {
        errors.push({ property: "title", message: "Title is required" });
      }
      if (!args.input.location) {
        errors.push({ property: "location", message: "Location is required" });
      }
      if (!args.input.price) {
        errors.push({
          property: "price",
          message: "Price field is required"
        });
      }
      if (!args.input.desc_tour) {
        errors.push({
          property: "desc_tour",
          message: "Description field is required"
        });
      }
      if (errors.length) {
        throw new UserInputError("", {
          errors
        });
      }

      return {
        id: result.insertId,
        title: args.input.title,
        price: args.input.price,
        category: args.input.category,
        desc_tour: args.input.desc_tour,
        location: args.input.location
      };
    },

    async createImages(parent, args, context) {
      let allId: number[] = [];
      let taskId = null;

      let result: ProductImages[] = [];

      args.input.map(async (image: any) => {
        if (!image.id && image.product_image) {
          const imageDates = await context.db.query<ProductImageDbQueryRezult>(
            "INSERT INTO tourimages (task_id, product_image, image_type) VALUES( ?, ?, ?)",
            [image.task_id, image.product_image, image.image_type]
          );

          imageDates.map((d: any) => {
            result.push({
              id: d.insertId,
              task_id: d.task_id,
              product_image: d.product_image,
              image_type: d.image_type
            });
          });
        }
        if (image.id && image.product_image) {
          const imageDates = await context.db.query<ProductImageDbQueryRezult>(
            "UPDATE tourimages SET product_image = ?, image_type = ? WHERE id = ?",
            [image.product_image, image.image_type, image.id]
          );

          imageDates.map((d: any) => {
            result.push({
              id: d.insertId,
              task_id: d.task_id,
              product_image: d.product_image,
              image_type: d.image_type
            });
          });
        }

        if (image.id) {
          taskId = image.task_id;
          allId = [...allId, image.id];

          const imageDates = await context.db.query<ProductImageDbQueryRezult>(
            "DELETE FROM tourimages WHERE task_id = ? AND id NOT IN (?)",
            [taskId, allId.join(",")]
          );
        }
      });

      return result;
    },

    async updateProductImages(parent, args, context) {
      const columns: string[] = [];
      const sqlParams: any[] = [];

      if (args.input.image_type) {
        columns.push("image_type = ?");
        sqlParams.push(args.input.image_type);
      }
      if (args.input.product_image) {
        columns.push("product_image= ?");
        sqlParams.push(args.input.product_image);
      }

      sqlParams.push(args.input.id);

      await context.db.query(
        `UPDATE tourimages SET ${columns.join(",")} WHERE id = ? `,
        sqlParams
      );

      const updatedTask = await getProductImageById(args.input.id, context.db);

      return updatedTask;
    },

    async createProductDate(parent, args, context) {
      const result = await context.db.query<OkPacket>(
        "INSERT INTO dates (task_id, active_date) VALUES( ?, ?)",
        [args.input.task_id, args.input.active_date]
      );

      return {
        id: result.insertId,
        task_id: args.input.task_id,
        active_date: args.input.active_date
      };
    },

    async updateProduct(parent, args, context) {
      const columns: string[] = [];
      const sqlParams: any[] = [];

      if (args.input.title) {
        columns.push("title = ?");
        sqlParams.push(args.input.title);
      }
      if (args.input.price) {
        columns.push("price = ?");
        sqlParams.push(args.input.price);
      }
      if (args.input.desc_tour) {
        columns.push("desc_tour = ?");
        sqlParams.push(args.input.desc_tour);
      }
      if (args.input.location) {
        columns.push("location = ?");
        sqlParams.push(args.input.location);
      }
      if (args.input.category) {
        columns.push("category = ?");
        sqlParams.push(args.input.category);
      }

      sqlParams.push(args.input.id);

      await context.db.query(
        `UPDATE products SET ${columns.join(",")} WHERE id = ?`,
        sqlParams
      );
      const updatedTask = await getProductById(args.input.id, context.db);

      return updatedTask;
    },
    async updateImageType(parent, args, context) {
      const columns: string[] = [];
      const sqlParams: any[] = [];

      if (args.input.image_type) {
        columns.push("image_type = ?");
        sqlParams.push(args.input.image_type);
      }

      sqlParams.push(args.input.id);

      await context.db.query(
        `UPDATE tourimages SET ${columns.join(",")} WHERE id = ?`,
        sqlParams
      );
      const updatedTask = await getProductImageById(args.input.id, context.db);

      return updatedTask;
    },

    async deleteProductDate(parent, args, context) {
      const date = await getProductDateById(args.id, context.db);

      if (!date) {
        throw new UserInputError("err");
      }
      await context.db.query("DELETE FROM dates WHERE id = ?", [args.id]);

      return date;
    },
    async deleteProductImage(parent, args, context) {
      const date = await getProductImageById(args.id, context.db);

      if (!date) {
        throw new UserInputError("err");
      }
      await context.db.query("DELETE FROM tourimages WHERE id = ?", [args.id]);

      return date;
    }
  }
};
