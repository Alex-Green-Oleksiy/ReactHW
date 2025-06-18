import { useEffect, useState } from 'react'
import { tasks, employees } from '../../data/tasksDevider'
import DividerForm from './DividerForm'
import { arrToObj } from './utils'
import EmployeeCard from './EmploeeCard'

function TasksDivider() {
  const [tasksObj, setTasksObj] = useState(() => ({}))
  const [employeesObj, setEmployeesObj] = useState(() => ({}))
  const [assignments, setAssignments] = useState(() => ({}))
  useEffect(() => {
    setTasksObj(arrToObj(tasks))
    setEmployeesObj(arrToObj(employees))
  }, [])

  function onSelect(empId, taskId) {
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [empId]: [...(prevAssignments[empId] || []), taskId],
    }))
  }
  function onDelete(empId, taskId) {
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [empId]: prevAssignments[empId].filter((id) => id !== taskId),
    }))
  }
  return (
    <>
      <DividerForm
        tasks={tasks}
        employeesList={employees}
        onSelect={onSelect}
      />
      <hr />
      {Object.keys(assignments).map((empId) =>
        empId ? (
          <EmployeeCard
            key={empId}
            empId={empId}
            tasksIds={assignments[empId]}
            employeeObj={employeesObj}
            tasksObj={tasksObj}
            onDelete={onDelete}
          />
        ) : null
      )}
    </>
  )
}

export default TasksDivider
