import Swal from 'sweetalert2';

const WithAttachedFunction = (
  title,
  text,
  deleteTitle,
  cancleTitle,
  deleteText,
  cancleText,
  value,
  handleApprove
) => {
  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: 'button button-success',
      cancelButton: 'button button-error'
    },
    buttonsStyling: true
  });

  newSwal
    .fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((result) => {
      if (result.value) {
        handleApprove(value);
        newSwal.fire(deleteTitle, deleteText, 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        newSwal.fire(cancleTitle, cancleText, 'error');
      }
    });
};

export default WithAttachedFunction;
