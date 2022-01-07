import numbro from 'numbro'

interface Numberic {
  format: (format: string) => string
}

const util = {
  Numberic: (value: number | string | undefined): Numberic => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      Number.isNaN(Number(value))
    ) {
      value = 0
    }

    return numbro(value)
  },
}

export default util
