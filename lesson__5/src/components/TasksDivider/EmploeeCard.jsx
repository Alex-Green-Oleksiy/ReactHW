import { memo } from 'react'

function EmployeeCard({ empId, tasksIds, employeeObj, tasksObj, onDelete }) {
  function removeTask(taskId) {
    onDelete(empId, taskId)
  }

  return (
    <div>
      <h2>{employeeObj[empId].name}</h2>
      <div>
        {tasksIds.map((taskId) => (
          <div key={taskId}>
            <span>{tasksObj[taskId].title}</span>
            <button onClick={() => removeTask(taskId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(EmployeeCard)
