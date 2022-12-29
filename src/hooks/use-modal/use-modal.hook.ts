import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from './use-modal.hook.module.css'

export function useModal(params = { danger: false }) {
  const { danger } = params
  const modal = withReactContent(
    Swal.mixin({
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        container: styles.container,
        title: styles.title,
        popup: styles.modal,
        htmlContainer: styles.content,
        validationMessage: styles.validationMessage,
        footer: styles.footer,
        confirmButton: `${styles.modalButton} ${
          danger ? styles.modalConfirmButtonDanger : styles.modalConfirmButton
        }`,
        cancelButton: `${styles.modalButton} ${styles.modalCancelButton}`,
      },
      showCancelButton: true,
      confirmButtonText: 'Ok',
    })
  )

  return modal
}
