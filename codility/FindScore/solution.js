const T = ['test1','test5b','test2a','test2b','test2c','test3','test4','test5a']
const R = ['Wrong','Wrong','OK','OK','Timeout','OK','OK','OK']
const groupSingle = []
const groupMultiple = []
const groupok = []

main(T,R)

function main(T,R) {
  makeGroupTest(T)
  console.log('single:', groupSingle)
  console.log('multiple:', groupMultiple)
  checkSingle()
  checkMultiple()
  
  console.log('gorup ok: ', groupok)
  const point = Math.floor(groupok.length * 100 / (groupMultiple.length + groupSingle.length))
  console.log('THE POINT:', point)
}

function makeGroupTest(T) {
  for (let i = 0; i < T.length; i++) {
    findGroupName(T[i],i)
  }
}

function findGroupName(TestName,index) {
  // find if latest char is a number
  const lastChar = TestName.substr(TestName.length - 1)
  if (isNaN(lastChar)) {
    const groupWithMultipleContent = TestName.substr(0, TestName.length - 1)
    if (groupMultiple.includes(groupWithMultipleContent) === false) {
      groupMultiple.push(groupWithMultipleContent)
    }
  } else {
    groupSingle.push(TestName)
  }
}

function checkSingle() {
  for(let i = 0; i < groupSingle.length; i++) {
    for(let j = 0; j < T.length; j++) {
      if (groupSingle[i] === T[j] && R[j] === 'OK') {
        groupok.push(groupSingle[i])
      }
    }
  }
}

function checkMultiple() {
  for(let i = 0; i < groupMultiple.length;i++) {
    for(let j = 0; j < T.length; j++) {
      const tgroupname = T[j].substr(0,T[j].length - 1)
      if (groupMultiple[i] === tgroupname && R[j] === 'OK') {
        if (groupok.includes(groupMultiple[i]) === false) {
          groupok.push(groupMultiple[i])
        }
      } else {
        const foundIndex = groupok.indexOf(groupMultiple[i])
        if (foundIndex >= 0) {
          groupok.splice(foundIndex, 1)
        }
        break
      }
    }
  }
}
