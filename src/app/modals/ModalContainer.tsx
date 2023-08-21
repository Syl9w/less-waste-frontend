import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'
import { Modal } from 'react-bootstrap'

export default observer(function ModalContainer() {
  const { modalStore } = useStore()

  return (
    <Modal
      show={modalStore.modal.open}
      onHide={modalStore.closeModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <div className='p-3'>{modalStore.modal.body}</div>
      
    </Modal>
  )
})
