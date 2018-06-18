export const file2DataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      resolve(event.target.result)
    }
  })
}

export const file = () => {
}
