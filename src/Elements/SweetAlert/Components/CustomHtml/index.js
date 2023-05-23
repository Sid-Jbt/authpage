import SweetAlert from 'Elements/SweetAlert';
import Swal from 'sweetalert2';

const CustomHtml = () => {
  const showAlert = () => {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: 'button button-success',
        cancelButton: 'button button-error'
      },
      buttonsStyling: false
    });
    newSwal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html: `You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span class="material-icons-round">thumb_up</span> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<span class="material-icons-round">thumb_down</span>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
  };

  return <SweetAlert title="Custom HTML" action={showAlert} />;
};

export default CustomHtml;
