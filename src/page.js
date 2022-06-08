import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form , Button, Pagination} from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from 'react-paginate';
import './index.css';

function Page() {
  const { register, handleSubmit, control, reset , formState: { errors } } = useForm();
  const [order, setOrder] = useState("ASC");

  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 3;
  const pagesVisited = pageNumber * userPerPage;

  const [data, setData] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if(savedTodos) {
      return JSON.parse(savedTodos);
    }
    else {
      return [];
    }
  });

  // สำคัญ
  function onSubmit(e) {
    alert(JSON.stringify(e));

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: e.title,
        name: e.firstname+" "+e.lastname,
        birtD: e.brithday,
        nationality: e.nationality,
        cId: e.Citizen[0]+"-"+e.Citizen[1]+"-"+e.Citizen[2]+"-"+e.Citizen[3]+"-"+e.Citizen[4],
        gender: e.gender,
        mobile: e.tel[0]+" "+e.tel[1],
        passport: e.passport,
        salary: e.salary,
      }
    ]);
    reset();
  }

  const sorting = (e) => {
    if(order=== "ASC"){
      console.log("yes here ASC");
      const sorted = [...todos].sort((a,b) => a[e].toLowerCase() > b[e].toLowerCase() ? 1 : -1);
      // console.log("yes here ASC end = "+data);
      setTodos(sorted);
      setOrder("DSC")
    }
    if(order=== "DSC"){
      console.log("yes here DSC");
      const sorted = [...todos].sort((a,b) => a[e].toLowerCase() < b[e].toLowerCase() ? 1 : -1);
      // console.log("yes here DSC end = "+data);
      setTodos(sorted);
      setOrder("ASC")
    }
  }

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos) {
      return JSON.parse(savedTodos);
    }
    else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value});
    // console.log("cuerren Todo ",currentTodo);
  }

  useEffect(() => {
    localStorage.setItem('todos',  JSON.stringify(todos))
    // setData(JSON.stringify(todos));
    // console.log("data = "+data);
  }, [todos], [data])

  function handleInputChange (e) {
    setTodo(e.target.value);
  }

  function handleInputFristnameChange (e) {
    setFirstname(e.target.value);
  }

  function handleFromSubmit (e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        }
      ])
    }
    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setEditing(true);
    setCurrentTodo({...todo})
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    })
    setEditing(false);
    setTodos(updatedItem);
  }

  function handleEditFromSubmit(e) {
    e.preventDefault();
    
    handleUpdateTodo(currentTodo.id , currentTodo);
  }

  const optionsTitle = [
    {value: 'Mr', label: 'Mr'},
    {value: 'Ms', label: 'Ms'},
  ];

  const optionsNationality = [
    {value: 'Thai', label: 'Thai'},
    {value: 'Amerigan', label: 'Amerigan'},
    {value: 'Japan', label: 'Japan'},
  ];
  
  const [title, setTitle] = useState(optionsTitle[0].value);
  const [firstname, setFirstname] = useState("");
  const [nationality, setNationality] = useState(optionsNationality[0].value);
  const [gender, setGender] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
  const [Citizen, setCitizen] = useState("");
  const [Citizen2, setCitizen2] = useState("");
  const [Citizen3, setCitizen3] = useState("");
  const [Citizen4, setCitizen4] = useState("");
  const [Citizen5, setCitizen5] = useState("");

  const [tel, setTel] = useState("");

  const handleChange = event => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };

  const handleChangeNationality = event => {
    console.log(event.target.value);
    setNationality(event.target.value);
  };

  const onChangeGender = event => {
    setGender(event.target.value);
    console.log("Gender = "+event.target.value);
  }

  const displayUser = todos.slice(pagesVisited , pagesVisited + userPerPage).map(todo => {
    return (
                <tr key={todo.id}>
                  <td><input className='radioS' type="radio"></input></td>
                  <td>{todo.name}</td>
                  <td>{todo.gender}</td>
                  <td>{todo.mobile}</td>
                  <td>{todo.nationality}</td>
                  {/* <td><Button variant="secondary" onClick={() => handleEditClick(todo)}>Edit</Button></td> */}
                  <td><Button variant="secondary">Edit</Button></td>
                  <td><Button variant="danger" onClick={() => handleDeleteClick(todo.id)}>Delete</Button></td>
                </tr>
    );
  });

  const pageCount = Math.ceil(todos.length / userPerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected);
  }

  // let active = 2;
  // let items = [];
  // for (let number = 1; number <= 5; number++) {
  //   items.push(
  //     <Pagination.Item key={number} active={number === active}>
  //       {number}
  //     </Pagination.Item>,
  //   );
  // }
  
  console.log(todos);

  return (
    <div className="App">
      {/* {isEditing ? (
          <form onSubmit={handleEditFromSubmit}>
            <h2>Edit Todo</h2>
            <label htmlFor="editTodo">Edit todo: </label>
            <input
              type="text"
              name="editTodo"
              placeholder='Edit todo'
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />
            <button type="submit">Update</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <form onSubmit={handleFromSubmit}>
            <input
              type="text"
              name="todo"
              placeholder='Create a new todo'
              value={todo}
              onChange={handleInputChange}
            />
            <Button type="submit" value="submit">submit</Button>
          </form>
        )} */}
      {/* <ul className='todo-list'>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              {" "}
              <button onClick={() => handleEditClick(todo)}>Edite</button>
              <button onClick={() => handleDeleteClick(todo.id)}>X</button>
            </li>
          ))}
      </ul> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="detial">
          <div>
            <div className='gen'>
              <span>Title</span><span className='error'>*</span>
              {/* <input {...register("firstName")}/>
              <input {...register("lastName")}/> */}
              <select {...register("title")} size="sm" style={{width: 100, marginRight: 20}} value={title} onChange={handleChange}>
                {optionsTitle.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <span>First Name </span> {errors.firstname && <span className='error'>*</span>}
            <input onChange={handleInputFristnameChange} name="firstname"  {...register("firstname", firstname , { required: true })}  placeholder='First name'/>
            
            <span>Last Name </span> {errors.lastname && <span className='error'>*</span>}
            <input name="lastname" {...register("lastname", { required: true })} placeholder='Last name'/>
          </div>

          <div className='birthday'>
            <div style={{alignItems: 'center'}}>
              BrithDay  <span className='error'>*</span>
            </div>
            
            <div style={{marginTop: -10}}>
              {/* <DatePicker 
                {...register("datepic")}
                className='datepic'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              /> */}
               <Controller
                  control={control}
                  name='brithday'
                  render={({ field }) => (
                    <DatePicker
                      placeholderText='DD/MM/YYYY'
                      dateFormat='dd/MM/yyyy'
                      id='start-date'
                      autoComplete='off'
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      required={true}
                    />
                )}
              />
            </div>
            
            
            <div style={{alignItems: 'center'}}>
              <span>Nationality</span>
              <select {...register("nationality")} size="sm" style={{width: 100, marginRight: 20}} value={nationality} onChange={handleChangeNationality}>
                  {optionsNationality.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
            </div>
          </div>

          <div className='Citizen'>
            <span>Citizen id</span>
            <input
                type="number"
                name="Citizen"
                {...register("Citizen.0")}
                value={Citizen}
                onChange={(event) => {
                        if(event.target.value.length===2) return false;   //limits to 10 digit entry
                        setCitizen(event?.target.value);       //saving input to state
                    }
                }
                id="Citizen"
              />
              <span>-</span>
              <input
                type="number"
                name="Citizen"
                {...register("Citizen.1")}
                value={Citizen2}
                onChange={(event) => {
                        if(event.target.value.length===5) return false;   //limits to 10 digit entry
                        setCitizen2(event?.target.value);       //saving input to state
                    }
                }
                id="Citizen"
              />
              <span>-</span>
              <input
                type="number"
                name="Citizen"
                {...register("Citizen.2")}
                value={Citizen3}
                onChange={(event) => {
                        if(event.target.value.length===6) return false;   //limits to 10 digit entry
                        setCitizen3(event?.target.value);       //saving input to state
                    }
                }
                id="Citizen"
              />
              <span>-</span>
              <input
                type="number"
                name="Citizen"
                {...register("Citizen.3")}
                value={Citizen4}
                onChange={(event) => {
                        if(event.target.value.length===3) return false;   //limits to 10 digit entry
                        setCitizen4(event?.target.value);       //saving input to state
                    }
                }
                id="Citizen"
              />
              <span>-</span>
              <input
                type="number"
                name="Citizen"
                {...register("Citizen.4")}
                value={Citizen5}
                onChange={(event) => {
                        if(event.target.value.length===2) return false;   //limits to 10 digit entry
                        setCitizen5(event?.target.value);       //saving input to state
                }}
                id="Citizen"
              />
          </div>

          <div className='Gender'>
            <span>Gender</span>
            <div onChange={onChangeGender}>
              <input className="radioS" {...register("gender")} type="radio" value="Male" name="gender" defaultChecked/> Male
              <input className="radioS" {...register("gender")} type="radio" value="Female" name="gender" /> Female
              <input className="radioS" {...register("gender")} type="radio" value="Unsex" name="gender" /> Unsex
            </div>
          </div>
          
          <div className='mobile'>
            <span>Mobile phone </span>{errors.tel && <span className='error'>*</span>}
            <Form.Select {...register("tel.0")} size="sm" style={{width: 100, marginRight: 20}}> 
                <option value="+66">+66</option>
                <option value="+99">+99</option>
              </Form.Select>
              <input
                type="number"
                name="tel"
                {...register("tel.1" , {required: true})}
                value={tel}
                onChange={(event) => {
                        if(event.target.value.length===9) return false;   //limits to 10 digit entry
                        setTel(event?.target.value);       //saving input to state
                    }
                }
                placeholder='Number Phone'
                id="tel"
              />
          </div>

          <div>
            <span>Passport No :</span>
            <input name="passprot" {...register("passport")}  placeholder='Passport No'/>
          </div>

          <div className="Sub">
            <div className="Pass">
              <span>Expected Salary : </span> {errors.salary && <span className='error'>*</span>}
              {/* <input {...register("passport")} name="todo" placeholder='Passport No'></input> */}


              <input name="salary" {...register("salary", { required: true })}  placeholder='Expected Salary'/>
              <span>THB</span>
            </div>
            <input
                style={{ display: "block", marginTop: 20 }}
                type="reset"
                value="Standard Reset Field Values"
            />
            <Button type="submit" value="submit">submit</Button>
          </div>
                
        </section>
        <section className="Loadtable">
          <div className="heading">
            <div className="box-contenter">
              <input className="radioS" type="radio" name='radionSelectDelete'></input>
              <span>Select All</span>
              <Button variant="danger" style={{marginLeft: 10}}>DELETE</Button>
            </div>
            <div className="box-contenter2">
              {/* <Button>Prev</Button>
              <Pagination size="sm" style={{marginTop: 13}}>{items}</Pagination>
              <Button>Next</Button> */}
              <ReactPaginate
                previousLabel={"previous"}
                nextlabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"pagintioDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th></th>
                <th onClick={() => sorting("name")}>Name</th>
                <th onClick={() => sorting("gender")}>Gender</th>
                <th onClick={() => sorting("mobile")}>Mobile</th>
                <th onClick={() => sorting("nationality")}>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {/* {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.name}</td>
                  <td>{todo.gender}</td>
                  <td>{todo.mobile}</td>
                  <td>{todo.nationality}</td>
                  <td><Button variant="secondary" onClick={() => handleEditClick(todo)}>Edit</Button></td>
                  <td><Button variant="danger" onClick={() => handleDeleteClick(todo.id)}>Delete</Button></td>
                </tr>
              ))} */}
              {displayUser}
            </tbody>
          </Table>
          
        </section>
      </form>
      
    </div>
  );
}

export default Page;
