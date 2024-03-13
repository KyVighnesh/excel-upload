import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios'
import {ExcelRenderer} from 'react-excel-renderer';




function App() {

  const[data,setData] = useState([])

  const[show,setShow] = useState(false)

  const[edit,setEdit] = useState({td1:"",td2:""})

  const[api,setApi] = useState([])


  

const onHandleFileInput = (e) => {

let fileObj = e.target.files[0];  // capture the file
console.log(fileObj)

ExcelRenderer(fileObj, (err, resp) => {
  if(err){
    console.log(err);
  }
  else{
    console.log(resp)
    let count = 1
    let id = 0
    let data = []
    console.log(resp)

    resp.rows.map ((ele)=> {
      id++
      let obj = {}
      obj["id"] = id
      ele.map((td)=> {

      obj[`td${count}`] = <td>{td}</td>  //explain

      //{td1:<td>{name}</td>}

      //[{td1:<td>{name}</td>,td2:<td>{name}</td>.......},{td1:<td>{name}</td>,td2:<td>{name}</td>.......},{td1:<td>{name}</td>,td2:<td>{name}</td>.......}] - 

      // ele - 0

      if(count > ele.length-1) {
        count = 0;
        // console.log(count)
      }
      count++

      })

      // setData(data.push(obj))
      data.push(obj)
    })

    console.log(data)

    setData(data)

  }
});   

  };

const onHandleUpload = () => {

  console.log(data)

   

}


const onHandleEdit  =  () => {
  setShow(true)
}

const onHandleChangeEdit = (e) => {
  setEdit({...edit,[e.target.name]:e.target.value})
}

const onHandleConfirm =(ele)=> {
  setShow(false)

  if(edit.td1.length>0) {

    setData(data.map((target)=> {
      if(ele.id == target.id) {
        target.td1 = edit.td1
        return target
      }
      return target
    }))

  }

  if(edit.td2.length>0) {
    setData(data.map((target)=> {
      if(ele.id == target.id) {
        target.td2 = edit.td2
        return target
      }
      return target
    }))
  }
  
    
  
}

  return (
    <div className="App">
      <div id='main-container'>
      <input type='file' onChange={onHandleFileInput}/>
      <button onClick={onHandleUpload}>Upload</button>

      </div>

      <div id='table-container'>

      <table id='table'>
        {
          data.map((ele,index)=> {
            return(
              
           
              <tr>
              {/* <td>{show && index>0?<input defaultValue={ele.td1} name='td1' onChange={onHandleChangeEdit}/>:<span>{ele.td1}</span>}
              </td>
              <td>{show && index>0?<input defaultValue={ele.td2} name='td2' onChange={onHandleChangeEdit}/>:<span>{ele.td2}</span>}</td>
              {index>0?<td>
              <button onClick={onHandleEdit}>Edit</button>
              </td>:""}
              {show && index >0?<td><button onClick={()=>onHandleConfirm(ele)}>Confirm</button></td>:""} */}

              {Object.values(ele)}
            </tr> 

              
            )
          })
        }

        
      </table>

      </div>
    </div>
  );
}

export default App;



