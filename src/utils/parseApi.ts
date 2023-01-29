export interface DataProduct {
  _id: string
  name: string
  variety: string
  imageUrl: string
  price: number
  category?: string
}

export interface DataProductFull extends DataProduct {
  nutritions: {
    calcium: number
    calories: number
    carbohydrate: {
      total: number
      dietaryFiber: number
      sugar: number
    }
    fat: {
      total: number
      saturatedFat: number
    }
    fiber: number
    iron: number
    magnesium: number
    protein: number
    vitaminB6: number
    vitaminC: number
  }
}

async function parseApi(data: DataProduct[]) {
  const stringified = JSON.stringify(data)
  const parsed = JSON.parse(stringified)

  return parsed
}

export default parseApi
