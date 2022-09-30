import React, {useState, useEffect} from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { swal } from "../../../../utils/swal";
import axios from 'axios';
import "../Auth.styles.css";
import blackwidow from '../../../../img/blackWidow.png'
import spiderman from '../../../../img/spiderman.png'
import ironman from '../../../../img/ironman.png'
import hulk from '../../../../img/hulk.png'
import hawkeye from '../../../../img/hawkeye.png'
import captainAmerica from '../../../../img/captainAmerica.png'
import avengers from '../../../../img/avengers.png'
import thor from '../../../../img/thor.png'
import logomarvel from '../../../../img/logomarvel.png'


export const Login = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);

  const initialValues = {
    userName: "avengers",
    password: "",
  }

  useEffect(() => {
    axios.get(`api/result`)
    
        .then((result) => {
          setData(result.data)
          console.log(result.data)}
        )
        .catch((error) => {
          console.log(error)})
  }, [setData]);


  const required = "* Campo obligatorio";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "La cantidad mínima de caracteres es 4")
        .required(required),
      password: Yup.string().required(required),
    });


  const onSubmit = () => {

    const {userName, password} = values
 

   axios.post(`api/login`, {
        userName,
        password,
      })
      .then((response) => {
        
        if (response.status === 200) {
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("userId", response?.data?.userId);
          localStorage.setItem("userName", response?.data?.userName);
          navigate("/", { replace: true });
        } 
    
      
      })
              .catch(function(error){
                
                 swal()
              }
           
              )
        }
     
     
    

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    formik;

  
    const renderAvenger=() =>{
      switch(values.userName){
        case 'Spider Man':
          return <img src={spiderman} className='equipo scale-up-center' alt='spiderman'/>;
       case 'Black Widow':
            return <img src={blackwidow} className='equipo scale-up-center' alt='blackwidow'/>;  
            case 'Iron Man':
            return <img src={ironman} className='equipo scale-up-center'alt='ironman'/>; 
            case 'Hawk Eye':
            return <img src={hawkeye} className='equipo scale-up-center' alt='hawkeye'/>; 
            case 'Thor':
            return <img src={thor} className='equipo scale-up-center' alt='thor'/>; 
            case 'Capitán América':
            return <img src={captainAmerica} className='equipo scale-up-center' alt='captainAmerica'/>; 
            case 'Hulk':
            return <img src={hulk} className='equipo scale-up-center'alt='hulk'/>; 
            default:
              return <img src={avengers} className='equipo_completo scale-up-center' alt='avengers'/>;
      }
      
    }
  

  return (
    <div>
    <div className='header_login'>
          <img className='logomarvel' src={logomarvel} alt='logomarvel'/>
       </div>
    <div className='wrapperLogin'>
      
       <div className="auth">
      
        <form onSubmit={handleSubmit}>
          <h1> ¡Bienvenid@, Avenger!</h1>
          <div>
            <label>¿Quién eres?</label>
            <select
            name="userName"
            onChange={handleChange}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Selecciona tu nombre...</option>
            {data.map((option, id) => {
            return(
                <option key={id} value={option.userName}>
                {option.userName}
              </option>)
})}
          </select>
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "error" : ""}
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
          </div>
          <div>
            <button type="submit">Enviar</button>
            
          </div>
          <div className='wrapperList'>
            <h5 style={{textAlign: 'center', margin:'20px 0 10px 0 ', padding: '0'}}>¿Aún no configuraste tu cuenta?</h5>
            <Link to="/register">Registrate</Link>
          </div>
        </form>
      </div>
     
      <div className='equipo'>
      {renderAvenger(values.userName)} 
        </div>
    </div>
    
    </div>
  );
};
