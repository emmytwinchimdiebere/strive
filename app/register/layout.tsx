import styles from '../../styles/register.module.css'


export default function RegisterLayout({children}:{children:React.ReactNode}){

    return(
        <div className="flex bg-slate-300">
            <div className="grid w-3/5 h-auto m-auto mb-10 rounded-md bg-slate-50 lg:grid-cols-2 md:grid-cols-1 md:mt-10 sm:mt-20 sm:m-auto">
                <div className={styles.imgStyles}>
                <div className={styles.catoonImg}></div>
                <div className={styles.droplets}></div>
                </div>
               
                <div className="flex flex-col rounded-br-md rounded-tr-md right justify-evenly">
                   <div className="py-10 text-center">
                    {children}
                   </div>
                </div>
            </div>

        </div>

    )

}