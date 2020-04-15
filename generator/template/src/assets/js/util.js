import storage from '@/assets/js/storage'

export default {
  isEmpty (val) {
    if (!val || JSON.stringify(val) === '{}' || val.length === 0) {
      return true
    }
    return false
  },
  jsonToString (data) {
    const str = []
    for (const p in data) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]))
    }
    return str.join('&')
  },
  arrayToString (array, split) {
    if (array === null || array === undefined) {
      return ''
    }
    let retStr = ''
    const itArray = JSON.parse(array)
    itArray.forEach((item, index) => {
      retStr = retStr + (item + (index === itArray.length - 1 ? '' : split))
    })
    return retStr
  },
  findKey (val, obj) {
    return Object.keys(obj).find(oIndex => obj[oIndex] === val)
  }
}
