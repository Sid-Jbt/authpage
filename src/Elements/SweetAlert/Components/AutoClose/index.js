import Swal from 'sweetalert2';
import SweetAlert from 'Elements/SweetAlert';

const AutoClose = () => {
  let timerInterval;

  const showAlert = () =>
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('I was closed by the timer');
      }
    });

  return <SweetAlert title="A message with auto close" action={showAlert} />;
};

export default AutoClose;
