export default function layout({children}:{children:React.ReactNode}){
    return (
    
    <div className="bg-slate-300 h-screen flex">
        <div className=" bg-gradient-to-br from-blue-600 to-indigo-700 grid grid-cols-1 grid-flow-row h-3/5 m-auto  w-3/4 rounded-md">
        <div className="m-auto mt-10 justify-center py-4 ">
        {children} 
        </div>
       
        </div>
    </div>
    
    )
}