import SweetAlert from 'Elements/SweetAlert';
import Swal from 'sweetalert2';

const WithAttachedFunction = () => {
  const showAlert = () => {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: 'button button-success',
        cancelButton: 'button button-error'
      },
      buttonsStyling: false
    });

    newSwal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.value) {
          newSwal.fire('Deleted!', 'Your file has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          newSwal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }
      });
  };

  return (
    <SweetAlert
      title='A warning message, with a function attached to the "Confirm" Button...'
      action={showAlert}
    />
  );
};

export default WithAttachedFunction;
