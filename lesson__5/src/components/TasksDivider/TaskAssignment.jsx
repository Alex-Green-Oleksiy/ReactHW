import { memo, useState } from 'react'

function TaskAssignment({ task, employeesList, onSelect }) {
  const [selectedEmplId, setSelectedEmplId] = useState('')

  function onChange(e) {
    onSelect(e.target.value, task.id)
    setSelectedEmplId('')
  }

  return (
    <div>
      <span>{task.title}</span>
      <select value={selectedEmplId} onChange={onChange}>
        <option value="">Виберіть виконавця</option>
        {employeesList.map((empl) => (
          <option key={empl.id} value={empl.id}>
            {empl.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default memo(TaskAssignment)
