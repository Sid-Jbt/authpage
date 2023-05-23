import Swal from 'sweetalert2';

import SweetAlert from 'Elements/SweetAlert';

const Success = () => {
  const showAlert = () => Swal.fire('Good job!', 'You clicked the button!', 'success');

  return <SweetAlert title="A success message" action={showAlert} />;
};

export default Success;
