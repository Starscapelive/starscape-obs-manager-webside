import { ref } from 'vue'

export const timeFormat = (timestamp: number) => {
  const time = new Date((timestamp + '').length === 10 ? timestamp * 1000 : timestamp)
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  return `${monthList[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`
}

export const myPlugins = ref([])
