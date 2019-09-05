// export default {
//   createShorthand: (style, ...values) => {
//     if (values.length === 1) return { [style]: values[0] }

//     const createStyle = (...values) => ({
//       [style + 'Top']: values[0],
//       [style + 'Right']: values[1],
//       [style + 'Bottom']: values[2],
//       [style + 'Left']: values[3],
//     })
    
//     if (values.length === 2) return createStyle(values[0], values[1], values[0], values[1]);
//     if (values.length === 3) return createStyle(values[0], values[1], values[2], values[1]);
//     return createStyle(values[0], values[1], values[2], values[3])
//   }
// }

export const createShorthand = (style, ...values) => {
  if (values.length === 1) return { [style]: values[0] }

  const createStyle = (...values) => ({
    [style + 'Top']: values[0],
    [style + 'Right']: values[1],
    [style + 'Bottom']: values[2],
    [style + 'Left']: values[3],
  })
  
  if (values.length === 2) return createStyle(values[0], values[1], values[0], values[1]);
  if (values.length === 3) return createStyle(values[0], values[1], values[2], values[1]);
  return createStyle(values[0], values[1], values[2], values[3])
}