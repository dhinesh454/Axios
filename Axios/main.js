// GET REQUEST //get the data
function getTodos() {
//  axios({
//   method:'get',
//   url:'https://jsonplaceholder.typicode.com/todos',
//   params:
//   {_limit:5}
//  })
//     .then(res=>showOutput(res))
//     .catch(err=>console.log(err));


//short Method
// u canlimit data from these two methods

// axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')   
.then(res=>showOutput(res))
    .catch(err=>console.log(err));
  
  }
  
  // POST REQUEST // new addition to the data
  function addTodo() {
//     axios({
//   method:'post',
//   url:'https://jsonplaceholder.typicode.com/todos',
//   data:{
//      title:'New Todo',
//      completed:false
//   }
//  })
//     .then(res=>showOutput(res))
//     .catch(err=>console.log(err));


//Short Method 
axios.post('https://jsonplaceholder.typicode.com/todos',{
  title:'New Todo',
  completed:false
})   
.then(res=>showOutput(res))
    .catch(err=>console.log(err));
  

  }







  
  // PUT/PATCH REQUEST
//in existing
  //put-- only updates what we given only updated remaining "not excluded" in data

  // post-- updates what we given and remaining all "existing" in data

  function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
      title:'Updated Todo',
      completed:false
    })   
    .then(res=>showOutput(res))
        .catch(err=>console.log(err));
    
  }
  





  // DELETE REQUEST /// returns empty obj 
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')   
    .then(res=>showOutput(res))
        .catch(err=>console.error(err));
  }
  







  // SIMULTANEOUS DATA
  function getData() {
//    axios.all([ axios.get('https://jsonplaceholder.typicode.com/todos'),
//    axios.get('https://jsonplaceholder.typicode.com/posts')
//    ///if u want 5 data only in url ?_limit=5(last)
// ]).then(axios.spread((todos,posts) => showOutput(todos)))
// // .then(res=>{
// //   console.log(res[0]);
// //   console.log(res[1]);
// //   showOutput(res[1])
// // })
// .catch(err=>console.error(err));






const request1 = axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5");
const request2 = axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
const request3 = axios.get("https://jsonplaceholder.typicode.com/users?_limit=5");

Promise.all([request1, request2, request3])
  .then(function(responses) {
    const [response1, response2, response3] = responses;
    // Handle the responses here
    showOutput(response1);
    showOutput(response2);
    showOutput(response3);
  })
  .catch(function(error) {
    console.log(error);
  });
}
   
  









  
  // CUSTOM HEADERS
  function customHeaders() {

const config = {
  header:{
    'content-Type':'application/json',
    Authorisation:'someToken'
  }
}









//we have to add 3rd parameter as a headerconfig

  axios.post('https://jsonplaceholder.typicode.com/todos',{
  title:'New Todo',
  completed:false
},config)   
.then(res=>showOutput(res))
    .catch(err=>console.log(err));
  

  }

  




  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
const option= {
  method:'post',
  url:'https://jsonplaceholder.typicode.com/todos',
  data:{
    title:'hello world'
  },
transformResponse:axios.defaults.transformResponse.concat(data=>{
  data.title=data.title.toUpperCase();
  return data;
})

}
axios(option).then(res=>showOutput(res))
  }
  








  // ERROR HANDLING
  function errorHandling() {
    axios.get('https://jsonplaceholder.typicode.com/todoss',{
      validateStatus:function(status){
        return status<500; ///reject only if stsatus i >= 500
      }
    })   
    .then(res=>showOutput(res))
        .catch(err=>{
          ///server responded with a status other than 200 range
          if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          

          // data not found status shown 404 so we can use as a condition 
          if(err.response.status===404)
          {
            alert('Error:Page Not Found')
          }
        }else if (err.request){
          //request was made but no response 
          console.error(err.request);
        }
        else{
          console.error(err.message);
        }

        });
  }
  






  // CANCEL TOKEN
  function cancelToken() {
  const source=axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos',{
  cancelToken:source.token

 })  
.then(res=>showOutput(res))
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log('Requested Cancel',thrown.message);
      }
    }); 
  
    if(true){
      source.cancel('Requested Cance!')
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES




  axios.interceptors.request.use(config=>{
      console.log(`${config.method} request sent to ${config.url} at ${new Date().getTime()}`)
      return config;
    },
    error=>{
      return Promise.reject(error)
    }
  )
  






  // AXIOS INSTANCES
  const axiosInstance=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
  });

  // axiosInstance.get('/comments').then(res=>showOutput(res));


  




























  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);