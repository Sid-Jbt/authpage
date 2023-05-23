import SweetAlert from 'Elements/SweetAlert';
import Swal from 'sweetalert2';

const Basic = () => {
  const showAlert = () => Swal.fire('Any fool can use a computer');

  return <SweetAlert title="Basic example" action={showAlert} />;
};

export default Basic;
