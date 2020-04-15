import store from 'store2'

export default {
  set (key, value) {
    store.set(key, value)
  },
  get (key, defaultValue) {
    const localValue = store.get(key)
    const sessionValue = store.session.get(key)
    const value = localValue === null ? sessionValue : localValue
    if (value === null) {
      return defaultValue
    } else {
      return value
    }
  },
  session (key, value) {
    store.session.set(key, value)
  },
  remove (key) {
    store.remove(key)
    store.session.remove(key)
  },
  clearAll () {
    store.clearAll()
    store.session.clearAll()
  }
}
