"use client"

import React from 'react'
import { Skeleton } from '@mui/material'

export default function Loading() {
  return (
    <div><Skeleton sx={{maxHeight:"",height:800}}  variant='rectangular' animation="wave" /></div>
  )
}
