import { Exception } from '../exceptions/index.exception'

export class Utils {
  static fileFilter = (fileOriginalName: string): string => {
    if (!fileOriginalName.match(/\.(jpg|jpeg|png|pdf)$/)) {
      Exception.badRequest('This file type is not allowed!')
    }
    return fileOriginalName
  }

  static isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  static camelToSnake = (str: string) => {
    str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }

  static fieldCamelToSnake = (model: object): object => {
    const camelKeys = (Object.keys(model))
    const snakeKeys = camelKeys.map((key) => this.camelToSnake(key))

    return { ...snakeKeys }
  }
}
