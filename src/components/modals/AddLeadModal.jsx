import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import DatePicker from '../ui/DatePicker'
import { STAGES } from '../../constants/stages'
import { PLATFORMS } from '../../constants/platforms'

const PLATFORM_OPTIONS = PLATFORMS.map(p => ({ value: p.slug, label: p.label }))
const STAGE_OPTIONS = STAGES.map(s => ({ value: s.slug, label: s.label }))

const EMPTY = { name: '', platform: 'upwork', stage: 'prospecting', dealValue: '', followUpDate: '' }

export default function AddLeadModal({ isOpen, onClose, onAdd, defaultStage }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY, stage: defaultStage || 'prospecting' })
      setErrors({})
    }
  }, [isOpen, defaultStage])

  function set(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onAdd({
      name: form.name.trim(),
      platform: form.platform,
      stage: form.stage,
      dealValue: form.dealValue ? Number(form.dealValue) : 0,
      followUpDate: form.followUpDate,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Lead" size="md">
      <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Client or project name"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          required
          autoFocus
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Platform"
            options={PLATFORM_OPTIONS}
            value={form.platform}
            onChange={set('platform')}
          />
          <Select
            label="Stage"
            options={STAGE_OPTIONS}
            value={form.stage}
            onChange={set('stage')}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Deal Value"
            type="number"
            min="0"
            placeholder="0"
            prefix="£"
            value={form.dealValue}
            onChange={set('dealValue')}
          />
          <DatePicker
            label="Follow-up Date"
            value={form.followUpDate}
            onChange={set('followUpDate')}
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Lead</Button>
        </div>
      </form>
    </Modal>
  )
}
