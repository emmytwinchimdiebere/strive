 export interface postProps   {
    id:number ,
    description : string,
    image_path:string,
    title:string,
    created_at:Date,
    updated_at:Date,
   
    
    
    
}



export interface postslug {
    params : {
        postSlug: string,
    }
}

type userProps  = {
    name:string
    email:string,
}

export interface props {
    id:number ,
    description : string,
    image_path:string,
    title:string,
    created_at:Date,
    updated_at:Date,
    user:userProps
    slug:string
  
}

