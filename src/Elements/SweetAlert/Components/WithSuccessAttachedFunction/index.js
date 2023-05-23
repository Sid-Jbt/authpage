import SweetAlert from 'Elements/SweetAlert';
import Swal from 'sweetalert2';

const WithSuccessAttachedFunction = () => {
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
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
  };

  return (
    <SweetAlert
      title='...and by passing a parameter, you can execute something else for "Cancel"'
      action={showAlert}
    />
  );
};

export default WithSuccessAttachedFunction;
