import type { NextApiRequest, NextApiResponse } from "next"
import connect from "src/database/mongoose"
import Product from "src/models/Product"
import { DataProduct } from "src/utils/parseApi"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataProduct[]>
) {
  try {
    if (req.method !== "GET") {
      throw new Error("Invalid Request Method.")
    }

    await connect()
    const select = "name variety price imageUrl"
    const result = await Product.find({}, select)

    res.status(200).json(result)
  } catch (error) {
    throw new Error(`/api/product: ${error}`)
  }
}
