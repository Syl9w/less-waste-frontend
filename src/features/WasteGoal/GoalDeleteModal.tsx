import { observer } from 'mobx-react-lite'
import { Button, Modal } from 'react-bootstrap'
import { useStore } from '../../app/stores/store'

export default observer(function DeleteModal() {
  const { modalStore, wasteGoalStore } = useStore()

  return (
    <>
      <h2>Deleting a Goal</h2>
      <p>Are you sure you want to delete the goal?</p>

      <Modal.Footer>
        <Button onClick={modalStore.closeModal} variant='outline-secondary'>
          Close
        </Button>
        <Button
          variant='outline-danger'
          type='submit'
          className='mt-1'
          onClick={() => {
            wasteGoalStore.deleteGoal()
            modalStore.closeModal()
          }}
          disabled={wasteGoalStore.submittingGoal}
        >
          {wasteGoalStore.submittingGoal ? 'Deleting' : 'Delete'}
        </Button>
      </Modal.Footer>
    </>
  )
})
