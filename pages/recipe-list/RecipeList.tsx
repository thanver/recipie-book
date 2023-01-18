import React, { useEffect } from 'react'
import { axiosApiInstance } from '../../helper/axios'

export const RecipeList = () => {
    useEffect(()=>{
        axiosApiInstance.get('/recipe')
    },[])
  return (
    <div>RecipeList</div>
  )
}
