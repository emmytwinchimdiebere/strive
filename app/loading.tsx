"use client"
import React from 'react'
import {Skeleton} from "@mui/material"


export default function Loading() {
  return (
    <div>
        <Skeleton className='h-full' variant="rectangular" animation="wave"/>
            
    </div>
  )
}
