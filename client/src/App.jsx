import {useRef, useState } from 'react'

import './App.css';
import axios from 'axios';
const You='you';
const AI='Ai';

function App() {
const inputref = useRef();
const [loading,setloading]=useState(false);
const [qna,setqna]=useState([]);
const Update=(from,value)=>{
  setqna((qna)=>[...qna,{from,value}])
}
const handle=()=>{
  const question=inputref.current.value;
  // setqna([...qna,{from:You,value:question}])
  Update(You,question);
  setloading(true);
  // console.log({question});
  axios.post('http://localhost:3000/chat',{
    question
  }).then((response)=>{
    // setqna([...qna,{from:AI,value:response.data.answer}])
    Update(AI,response.data.answer);
  }).finally(()=>{
    setloading(false)
  })
}
const rendercontent=(qna)=>{
  const value=qna.value;
  if(Array.isArray(value)){
    return value.map((v)=><p className='mt-2'>{v}</p>)
  }
  return <p>{value}</p>
}

  return (
         <div className="bg-light">
          <div className="container mb-5">

            <div className="row">
              {
                qna.map((qna)=>{
                  if(qna.from===You){
                    return(

                    <div className="col-md-8 col-8 border-start-0 mt-2 rounded-end shadow-sm" style={{backgroundColor:'rgb(255, 204, 204)'}}>
                      <p>Question:</p>
                      <p className=''>

                      {
                        rendercontent(qna)
                      }
                      </p>
                      
                    </div>
                )
              }
              
              return(
                <div>

                <div className="col-md-9 col-9 border mt-2 mb-5 float-end rounded-3 shadow-sm" style={{backgroundColor:'rgb(204, 255, 230)'}}>
                  
                  <p>Answer :</p>
                  <p className=''>

                  {
                        rendercontent(qna)
                  }
                  </p>
                </div>
                </div>
  
              )
              
           
          })
        }
        {loading && (
          <div>

          <div className="col-md-9 col-9 border mt-2 mb-5 float-end rounded-3 shadow-sm" style={{backgroundColor:'rgb(204, 255, 230)'}}>
                  
          <p>Answer :</p>
          <p className=''>typing....</p>
          
        </div>
          </div>
        )

        }

            </div>

          </div>

         <div className="container fixed-bottom">
          <div className="row">
            <div className="col-sm-7 col-10 p-0 mb-2">
              <input className='form-control w-100' ref={inputref} type="text" placeholder='search'/>

            </div>
            <div className='col-sm-2 col-2 p-0'>

              <button className='btn btn-primary w-100 float-left' disabled={loading} onClick={handle}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            </div>
        </div> 
         </div> 
    
    
  )
}

export default App
