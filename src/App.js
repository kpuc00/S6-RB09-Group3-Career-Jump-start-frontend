import { Navbar } from "./components";
import Router from "./Router";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import {setErrorState} from "./features/auth/authSlice";
import {useDispatch} from "react-redux";


function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorState(null))
  },[location])

  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
