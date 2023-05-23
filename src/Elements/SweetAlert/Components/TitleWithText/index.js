import SweetAlert from 'Elements/SweetAlert';
import Swal from 'sweetalert2';

const TitleWithText = () => {
  const showAlert = () =>
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageAlt: 'Custom image'
    });

  return <SweetAlert title="A title with a text under" action={showAlert} />;
};

export default TitleWithText;
