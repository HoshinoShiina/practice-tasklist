// 'use client'

// import { useState } from "react"
// import { useReducer } from "react"
// import { v4 as uuidv4 } from 'uuid'



// const initialState = [
//   { id: 1, task: 'task1', done: true },
// ]

// const stateReducer = (state, action) => {
//   switch (action.type) {
//     case 'add':
//       return [
//         ...state,
//         {
//           id: action.payload.id,
//           task: action.payload.task,
//           done: false
//         }
//       ]
//     case 'delete':
//       return state.filter(item => item.id !== action.payload.id)
//     case 'setFinish':
//       return state.map((item) => item.id === action.payload.id ? { ...item, done: !item.done } : item)
//     default:
//       return state
//   }
// }

// function TaskList({ todo, deleteFunction, setFinishFunction }) {
//   return (
//     todo.map((item) => {
//       return (
//         <div key={item.id}>
//           <p>task name:{item.task} </p>
//           <h1>completion status:
//             <input type='checkbox'
//               checked={item.done}
//               onChange={() => setFinishFunction(item.id)}
//             /> {item.done ? <>finish</> : <>unfinish</>}</h1>

//           <button onClick={() => { deleteFunction(item.id) }}>delete task</button>
//           {/* 此处 deleteFunction捕获了item的id，如果deleteFunction(1)，会将1传递给下面的定义式。
//           使得payload: { 1 } ，state.filter(item => item.id !== action.payload.id),其中action.payload.id = 1
//           遍历数组state，筛选出item.id 不等于 action.payload.id的，从而删除id=1的数组
//           */}
//         </div>
//       )
//     }))
// }

// export default function App() {
//   const [todo, dispatch] = useReducer(stateReducer, initialState)
//   const [text, setText] = useState('')


//   const addFunction = () => {
  
//     const randomId = uuidv4()
//     dispatch({
//       type: 'add',
//       payload: {
//         id: randomId,
//         task: text
//       }
//     })
//   }

//   const deleteFunction = (id) => {
//     dispatch({
//       type: 'delete',
//       payload: { id }
//     })
//   }

//   const textFunction = (e) => {
//     setText(e.target.value)
//   }

//   const setFinishFunction = (id) => {
//     dispatch({
//       type: 'setFinish',
//       payload: { id }
//     })
//   }

//   return (
//     <pre>
//       <p>Name of the task to be added</p>
//       <input
//         value={text}
//         onChange={textFunction}
//       />
//       <button onClick={addFunction}>add task</button>
//       <TaskList todo={todo} deleteFunction={deleteFunction} setFinishFunction={setFinishFunction} />
//     </pre>
//   )
// }


'use client'
// 此处更新了美化界面
import { useState } from "react"
import { useReducer } from "react"
import { v4 as uuidv4 } from 'uuid'

const initialState = [
  { id: 1, task: 'task1', done: true },
]

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.payload.id,
          task: action.payload.task,
          done: false
        }
      ]
    case 'delete':
      return state.filter(item => item.id !== action.payload.id)
    case 'setFinish':
      return state.map((item) => item.id === action.payload.id ? { ...item, done: !item.done } : item)
    default:
      return state
  }
}

function TaskList({ todo, deleteFunction, setFinishFunction }) {
  return (
    <div className="space-y-4 mt-8 w-96">
      {todo.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded p-4 w-full">
          <p className="text-lg font-semibold">{item.task}</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => setFinishFunction(item.id)}
                className="w-6 h-6 accent-blue-500"
              />
              <span>{item.done ? 'Finished' : 'Unfinished'}</span>
            </label>
            <button
              onClick={() => deleteFunction(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Task
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [todo, dispatch] = useReducer(stateReducer, initialState)
  const [text, setText] = useState('')

  const addFunction = () => {
    const randomId = uuidv4()
    dispatch({
      type: 'add',
      payload: {
        id: randomId,
        task: text
      }
    })
  }

  const deleteFunction = (id) => {
    dispatch({
      type: 'delete',
      payload: { id }
    })
  }

  const textFunction = (e) => {
    setText(e.target.value)
  }

  const setFinishFunction = (id) => {
    dispatch({
      type: 'setFinish',
      payload: { id }
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="bg-white shadow-md rounded p-6 w-96">
        <p className="text-lg font-semibold mb-4">Name of the task to be added</p>
        <input
          value={text}
          onChange={textFunction}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter task name"
        />
        <button
          onClick={addFunction}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Task
        </button>
      </div>
      <TaskList
        todo={todo}
        deleteFunction={deleteFunction}
        setFinishFunction={setFinishFunction}
        className="mt-8"
      />
    </div>
  )
}