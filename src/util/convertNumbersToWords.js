const map = {
  1: {
    1: 'one',
    10: 'ten',
  },
  2: {
    1: 'two',
    10: 'twenty'
  },
  3: {

  }
}

147,393,658,578
'147393658578'


'223'.split('').map((number, index, arr) => {
  if (arr % 3 === 0 && (index === 0 || (index > 3 && index % 3 === 1))) {
    return `${map[number][1]} hundred`;
  }
  if (arr % 2)
});

export const convertNumbersToWords = (number) => 