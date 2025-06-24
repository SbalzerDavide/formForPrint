export function storeModel(field, mutation) {
  return {
    get() {
      return this.$store.state[field]
    },
    set(value) {
      this.$store.commit(mutation, value)
    }
  }
}