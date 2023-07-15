export function flattenObject<T extends object>(
  obj: T,
  prefix = ''
): Record<string, string> {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (
      typeof obj[key as keyof T] === 'object' &&
      !Array.isArray(obj[key as keyof T])
    ) {
      const flattenedObj = flattenObject(obj[key as keyof T], newKey)
      Object.assign(acc, flattenedObj)
    } else {
      acc[newKey] = obj[key as keyof T]
    }

    return acc
  }, {} as Record<string, any>)
}

export function unflattenObject(
  obj: Record<string, string>
): Record<string, any> {
  const unflattenedObj: Record<string, any> = {}

  for (const key in obj) {
    const value = obj[key]
    const keys = key.split('.')
    let currentObj = unflattenedObj

    for (let i = 0; i < keys.length; i++) {
      const nestedKey = keys[i]

      if (i === keys.length - 1) {
        currentObj[nestedKey] = value
      } else {
        currentObj[nestedKey] = currentObj[nestedKey] || {}
        currentObj = currentObj[nestedKey]
      }
    }
  }

  return unflattenedObj
}

// const json = {
//   app: {
//     message: 'text',
//     message2: 'text'
//   },
//   app2: 'text'
// };

// const flattened = flattenObject(json);
// console.log(flattened);

// const unflattened = unflattenObject(flattened);
// console.log(unflattened);
