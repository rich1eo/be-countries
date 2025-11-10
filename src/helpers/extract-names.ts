type Collection = {
  name: string
}

export const extractNames = (collection: Collection[] = []) => {
  return collection.map((item) => item.name)
}
