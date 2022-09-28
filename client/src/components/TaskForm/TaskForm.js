import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TaskForm.styles.css";
import axios from "axios";
import {Link} from 'react-router-dom'
import {Header} from '../Header/Header'


export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
    
  };

  const onSubmit = (values) => {
    console.log(values)
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    const {title, status, importance, description} = values;


     axios.post(`api/task/create`,  {
      title, status, importance, description, userName, userId },
      { headers:  {
        'Authorization': `Bearer ${token}`,
       }            
        
    }
   ,)
      .then((response) => {
        if (response.status === 200){
        resetForm();
        toast.success('Tu estrategia se creó!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
     
            }
      })
      
      .catch ((error) => {console.log(error)});

      };

  const required = "* Campo obligatorio";

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(6, "La cantidad mínima de caracteres es 6")
        .required(required),
      status: Yup.string().required(required),
      description: Yup.string().required(required),
      importance: Yup.string().required(required),
    });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;

  return (
    <>
    <Header/>
    <div className='newTaskWrapper'>
     
    <section className="task-form">
      <h1>Crear estrategia</h1>
      <p>Crea tus acciones </p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Título"
              className={errors.title && touched.title ? "error" : ""}
              value={values.title}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              className={errors.status && touched.status ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option value="">Seleccionar un estado</option>
              <option value="New">Nueva</option>
              <option value="In process">En proceso</option>
              <option value="Finished">Teminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="importance"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.importance && touched.importance ? "error" : ""}
              value={values.importance}
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="Low">Baja</option>
              <option value="Medium">Media</option>
              <option value="High">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="error-message">{errors.importance}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
            onBlur={handleBlur}
            className={errors.description && touched.description ? "error" : ""}
            value={values.description}
          />
        </div>
        <div>
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <div className="buttons">
          <button id='crear' type="submit" style={{width:'95px'}}>Crear</button>
          <button><Link to="/">Volver</Link></button>            
        </div>
      </form>
      <ToastContainer />
    </section>
    </div>
    </>
  );
};
