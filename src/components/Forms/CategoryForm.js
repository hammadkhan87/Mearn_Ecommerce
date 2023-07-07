import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <h2>Add new Category</h2>
    
    <input type="text" className="form-control" placeholder='Enter new Category' value={value} onChange={(e)=>setValue(e.target.value)} />
  </div>
 
  
  <button type="submit" className="btn btn-primary">Add</button>
</form>

    </>
  )
}

export default CategoryForm