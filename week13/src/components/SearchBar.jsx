import React from 'react'
import { useForm } from 'react-hook-form'

function SearchBar({onSearch}) {
  let {register,handleSubmit}=useForm()

  const onFormSubmit=({city})=>{
    onSearch(city)
  }

  return (
    <div>
      <form className="d-flex gap-2 w-75 mx-auto mt-4" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register('city')} placeholder="Search by City" className="form-control w-50" />
        <button type="submit" className='btn btn-success'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar