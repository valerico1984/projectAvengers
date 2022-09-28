import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import {Formik, Form} from 'formik';


import "../Auth.styles.css";
import logocompleto from '../../../../img/logocompleto.png'
import { swal2 } from "../../../../utils/swal2.jsx";
import Swal from 'sweetalert2';



export const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`api/result`)
    
    .then((result) => {
      setData(result.data)}
  
   
    );
  
}, [setData]);

  
  const required = "*Campo obligatorio";

  const registerSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "La cantidad mínima de caracteres es 4")
        .required(required),
      password: Yup.string().required(required).min(4, "La contraseña debe tener más de 4 caracteres"),
      email: Yup.string().email("Debe ser un email válido").required(required),
            
    });

  
  return (
    <div className="auth">
       <img className='logo_completo flip-vertical-fwd' src={logocompleto} alt='logo'></img>
      <Formik 
          initialValues={{
            "userName":'',
            "email":'',
            "password":''   
               }}
         validationSchema={registerSchema}

           onSubmit={(values)=>{
            const {userName, password, email} = values;

            axios.post(`api/register`, {
                       userName,
                       password,
                       email
                    })
                   .then((response)=>{
                  
                    if (response.status === 200) {
                      swal2()
                    navigate("/login", { replace: true });
                   }
                  }
                  
                  )
                  .catch(function(error){
                    Swal.fire({
                      title: 'Error!',
                      text: 'Verifique los datos',
                      icon: 'error',
                      confirmButtonColor: 'red'
                    })
                 })
                  

           }}
          

           >
    {({
           
           errors,
           touched,
           handleSubmit,
           handleBlur,
           handleChange
           
         
        }) =>{
          return(
      <Form onSubmit={handleSubmit}>
        <h1 style={{textAlign: 'center'}}>Registro</h1>
        <div>
          <label>¿Cuál es tu nombre?</label>
          <select
            name="userName"
            onChange={handleChange}
            className={errors.userName && touched.userName ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Selecciona tu nombre...</option>
            {data?.map((option, id) => {
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
            className={errors.password && touched.password ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className={errors.email && touched.email ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div className='wrapperList'>
            <h5 style={{textAlign: 'center', margin:'20px 0 10px 0 ', padding: '0'}}>¿Ya estás registrado?</h5>
            <Link to="/login">Inicia sesión</Link>
          </div>

      </Form>
          )
        }}
      </Formik>
    </div>
          
  );
};
