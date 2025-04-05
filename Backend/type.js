// const zod = require("zod")
import { z } from "zod";

// import { z } from "zod";

const createProduct = z.object({
  name: z.string(),
  sku: z.string().min(1), // Unique constraint should be enforced in the database
  //category_id: z.number().int().positive(), // Foreign Key to Categories table
  price: z.number().positive(), // Decimal value
  stock: z.number().int().nonnegative(), // Integer, can't be negative
  status: z.enum(["In Stock", "Out of Stock"]), // Enum values
  tags: z.array(z.string()), // Array of tags (or can use z.record() for JSON)
  
});

export default  createProduct;

  