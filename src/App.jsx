import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [title, settitle] = useState('')
    const [details, setdetails] = useState('')
    const [task, setask] = useState([])

    useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taskdata"));
    if (saved) {
      setask(saved);
    }
  }, []);


  const submitHandler = (e)=>{
    e.preventDefault();
    console.log(`Form Submited ${title}`);
    console.log(`Form details ${details}`);

   
       const copyTask = [...task];
      copyTask.push({title,details})

    
      localStorage.setItem("taskdata",JSON.stringify(copyTask))

    setask(copyTask);

    settitle('');
    setdetails('');
      }


    
      
      
      const deleteNotes = (idx)=>{
        const copyTask = [...task]
        console.log(copyTask[idx]);

        copyTask.splice(idx,1)
         localStorage.setItem("taskdata", JSON.stringify(copyTask));

        setask(copyTask);
        // console.log(idx);
        
      }

  return (
    <>
    <div className='h-screen lg:flex bg-black text-white '>
      <form onSubmit={submitHandler} className='flex  lg:w-1/2 flex-col items-start gap-4 p-10'>

      {/* PEHLA INPUT */}
        <input  className='px-5 w-full py-2 outline-none h-10 border-2 rounded' type="text"
         placeholder='Enter Heading'
         value={title}
         onChange={(e)=>{settitle(e.target.value);
         }}
         />
        
        {/* DETAILS VALA INPUT */}
        <textarea className='px-5 w-full py-2 outline-none h-40 border-2 rounded' placeholder='Writre Deatils'
        value={details}
        onChange={(e)=>{setdetails(e.target.value)}}
        />
        <button className='bg-white w-full active:bg-gray-300 px-5 py-2 text-black'>Add Notes</button>
      </form>
      <div className='p-10 lg:border-l-2  lg:w-1/2 '>
      <h1 className="text-3xl font-bold">Your Note</h1>
      <div className="flex flex-wrap items-start  justify-between lg:justify-start gap-5 mt-5 h-full overflow-auto">
        {task.map(({title,details},idx)=>{
          return <div key={idx} className='flex justify-between    flex-col items-start h-52 p-4  w-40 bg-cover rounded-2xl  bg-[url("https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png")] text-black'>
            <div className='break-words whitespace-normal'><h1 className="leading-tight   text-xl font-bold">{title}</h1>
          <p className="mt-4 break-all whitespace-normal leading-tightl font-medium text-gray-800">{details}</p></div>
                    <button onClick={()=>{
                      deleteNotes(idx)
                    }} className='w-full cursor-pointer active:scale-60 bg-red-600 px-5 py-1 rounded'>Delete</button>

          </div>
          
        })} 
      </div>
    </div>
    </div>
    
    </>
  )
}

export default App
