import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import "./Header.styles.css";
import logo from '../../img/Logo.jpg'
import Swal from 'sweetalert2'

import ironmanavatar from '../../img/ironmanavatar.png'
import blackwidowavatar from '../../img/blackwidowavatar.jpg'
import spidermanavatar from '../../img/spidermanavatar.png'
import hulkavatar from '../../img/hulkavatar.png'
import hawkeyeavatar from '../../img/hawkeyeavatar.png'
import captainAmericaavatar from '../../img/captainAmerica.png'
import avengersavatar from '../../img/avengersavatar.png'
import thoravatar from '../../img/thoravatar.jpg'


export const Header = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');



  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });


  const handleLogout = () => {
    Swal.fire({
      title: '¿Ya está todo planificado?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Listos!',
      confirmButtonColor: '#3B67A0',
      denyButtonText: `Aún falta...`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire('Perfecto!', 'A salvar el mundo', 'success')
        localStorage.removeItem("token");
       localStorage.removeItem("userName");
       navigate("/login", { replace: true });
      } else if (result.isDenied) {
        Swal.fire('Ok... a seguir planificando!', '', 'info')
      }
    })
  
  };

  
  function renderAvenger(){
    switch(userName){
      case 'Spider Man':
        return <img src={spidermanavatar} className='avatar scale-up-center' alt='spidermanavatar'/>;
     case 'Black Widow':
          return <img src={blackwidowavatar} className='avatar scale-up-center' alt='blackwidowavatar'/>;  
          case 'Iron Man':
          return <img src={ironmanavatar} className='avatar scale-up-center'alt='ironmanavatar'/>; 
          case 'Hawk Eye':
          return <img src={hawkeyeavatar} className='avatar scale-up-center' alt='hawkeyeavatar'/>; 
          case 'Thor':
          return <img src={thoravatar} className='avatar scale-up-center' alt='thoravatar'/>; 
          case 'Capitán América':
          return <img src={captainAmericaavatar} className='avatar scale-up-center' alt='captainAmericaavatar'/>; 
          case 'Hulk':
          return <img src={hulkavatar} className='avatar scale-up-center'alt='hulkavatar'/>; 
          default:
            return <img src={avengersavatar} className='avatar scale-up-center' alt='avengers'/>;
    }
    
  }
  

  return (
    <header>
      <img className='logo' src={logo} alt="Logo" />
      
      <div className="wrapper_right_header">
          <div>{renderAvenger(userName)}</div>
           <div className="textdata">Avenger: {userName}</div>
         
          <div className="textdata">Estrategias creadas: {!tasks ? 0 : tasks.length}</div>
            
        
      </div> 
      <div>
        <button className='buttonHeader' onClick={handleLogout}>Cerrar Sesión</button>
       </div>
    
    </header>
  );
  }
