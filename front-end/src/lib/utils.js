const createYearARRAY = () => {
  const year = []
  const yearNow = new Date().getFullYear()
  for (let i = yearNow - 1; i < yearNow + 1; i++) {
    year.push(`${i}-${i + 1}`)
  }
  return year
}

const createHKARRAY = () => {
  const hk = []
  for (let i = 1; i <= 3; i++) {
    hk.push(`HK0${i}`)
  }
  return hk
}

export { createYearARRAY, createHKARRAY }
