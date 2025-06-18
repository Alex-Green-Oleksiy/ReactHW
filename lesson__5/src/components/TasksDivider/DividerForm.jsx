import { memo } from 'react'
import TaskAssignment from './TaskAssignment'

function DividerForm({ tasks, employeesList, onSelect }) {
  return (
    <div>
      <h1>Розподілювач</h1>
      <h2>Задачі </h2>
      <div>
        {tasks.map((task) => (
          <TaskAssignment
            key={task.id}
            task={task}
            employeesList={employeesList}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(DividerForm)
