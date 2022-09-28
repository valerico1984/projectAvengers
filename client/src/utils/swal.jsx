import Swal from "sweetalert2"

export const swal = () =>
   Swal.fire({
      title: "Usuario y/o contraseña inválidos",
      text: "Por favor intente nuevamente",
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#3B67A0',
      width: "400px",
      timer: 10000,
      timerProgressBar: true,
   })
