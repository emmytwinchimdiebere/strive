'use client'; // Error components must be Client components

import { useEffect } from 'react';
import {Box} from '@mui/material'
import serverDown from '../../public/assests/undraw_server_down_s4lk.png'
import Image from 'next/image'

export default function Error({error,reset,}: {error: Error;reset: () => void;}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (

<div style={{minHeight:"100vh"}} className="flex flex-col text-center justify-center">
       
       <div className='text-center justify-center'>
        <Image priority className='m-auto w-auto h-auto' src={serverDown} alt="server-down" height={200} width={200} />
       <h1>Something went wrong!</h1>
      <button className='bg-indigo-500 rounded-lg m-auto text-white px-5 py-2'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
       </div>

    </div>
      
    
  );
}
