import { atom } from "recoil"
import { Answer } from "npm/interfaces/answer.interface"
const submittedState = atom({
    key: 'submittedState',
    default: false
  })
  
  
  
  const answerState = atom({
    key: 'answerState',
    default: { 
      syd: 4,
      lok: 4,
      stu: 4,
      el: 4
    }
  })

  export {submittedState, answerState}