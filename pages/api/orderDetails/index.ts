import type { NextApiRequest, NextApiResponse } from "next"
import connect from "src/database/mongoose"
import OrderDetails, { OrderDetailsTypes } from "src/models/OrderDetails"
import Product from "src/models/Product"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect()

    switch (req.method) {
      case "POST":
        const addOrder = req.body
        const saveOrder = new OrderDetails(addOrder)
        return saveOrder
          .save()
          .then((value: OrderDetailsTypes) =>
            res.status(200).json({ result: value })
          )

      case "GET":
        const readAllOrders = await OrderDetails.find({})
          .populate({
            path: "items",
            populate: {
              path: "products",
              populate: {
                path: "product",
                select: "name price",
                model: Product,
              },
            },
          })
          .sort({ createdAt: "desc" })

        res.status(200).json({ result: readAllOrders })
        return

      default:
        throw new Error(`Invalid Request Method.`)
    }
  } catch (error) {
    throw new Error(`/api/product: ${error}`)
  }
}
