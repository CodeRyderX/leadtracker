import React from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm" size="sm">
      <div className="px-6 py-5 flex flex-col gap-5">
        <p className="text-sm text-surface-700 dark:text-dark-700">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}
