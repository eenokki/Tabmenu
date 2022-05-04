import React, { useState }  from 'react'
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function App() {
  const [todo, setTodo] = useState({desc: '', date: '', priority: ''});
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    setTodos([...todos, todo]);
    setTodo({desc: '', date: '', priority: ''});
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  } 

  const dateChanged = (newDate) => {
    setTodo({...todo, date: newDate});
  } 

  const columns = [
    { field: 'desc', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true },
  ]

  return (
    <div className="App">
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <TextField label="Description" name="desc" value={todo.desc} onChange={inputChanged}/>       
       
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={todo.date} onChange={newDate=>dateChanged(newDate)} />
        </MuiPickersUtilsProvider>

        <TextField label="Priority" name="priority" value={todo.priority} onChange={inputChanged}/>
        <Button onClick={addTodo} variant="contained">Add</Button>
      </Stack>

      <div className="ag-theme-material" style={{height: 400, width: 600, margin: 'auto'}}>
        <AgGridReact
          rowData={todos}
          columnDefs={columns}>
        </AgGridReact>     
      </div>
    </div>
    
  );
}

export default App;
