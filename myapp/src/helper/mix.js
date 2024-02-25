const validate = (task) => {
    // console.log()
    const errors = {};
    if (!task.title) {
      errors.title =
        "Task title is required!";
    }
    if (!task.description) {
      errors.description = "Description is required !";
    }
    if (!task.status) {
      errors.status = "Status is required !";
    }
    if (!task.priority) {
      errors.priority = "Priority  is required !";
    }
    if (!task.asignedto) {
      errors.asignedto = "User assign is required !";
    }
    if (!task.due_date) {
      errors.due_date = "due date is required !";
    }
    if (!task.completion_date) {
      errors.completion_date = "completion  is required !";
    }
   
    return errors;
  };

  export default validate