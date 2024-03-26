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

function convert24to12(time) {
  var hours = time.split('g')[0] // get the hours
  var minutes = time.split('g')[1] // get the minutes
  var part = hours >= 12 ? 'PM' : 'AM' // get AM/PM

  // convert hours from 24-hour format to 12-hour format
  hours = hours % 12
  // 12:00 PM and 12:00 AM are special cases
  hours = hours ? hours : 12

  // return the result
  return hours + ':' + minutes + ' ' + part
}

function addTime(time, add) {
  if (add == '') {
    return time
  }
  const aTime = time.split('g')
  let plusHour = Math.floor(add / 60)
  let plusMinute = add % 60

  if (plusMinute + aTime[1] > 60) {
    plusHour += 1
    plusMinute -= 60
  }

  const newHour = parseInt(aTime[0]) + plusHour
  const newMinute = parseInt(aTime[1]) + plusMinute

  return `${newHour}g${newMinute}`
}

export { createYearARRAY, createHKARRAY, convert24to12, addTime }
