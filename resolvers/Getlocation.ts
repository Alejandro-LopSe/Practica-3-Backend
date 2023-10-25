import { Location,Apierror } from "../mongo/types.ts";
import { LocationCollection } from "../mongo/db.ts";

const url = "https://rickandmortyapi.com/api/location"

export const  getlocation =async (id: string): Promise<Location> => {
    
    
    try{

        if(id==="remove") {
        
            await LocationCollection.deleteMany({})
            throw String("Locations, eliminados.")
                   
        }

        const ID:number = parseInt(id)

        if(ID<0){
            throw String("La pagina es menor a 0, paginacion imposible")
        }


        const existe = await LocationCollection.findOne({_id: ID})

        if(!existe){
            const response = await  fetch(`${url}/${id}`)

            if(response.status!==200){
                
                const error: Apierror = await response.json()
                
                throw error;
            }
            
            const data: Location = await response.json()
            
            const date: string | undefined = data.created?.toString()

            const day: string  =date?.substring(8,10)+"-"+date?.substring(5,7)+"-"+date?.substring(0,4)   

            const finaldata:Location = {
                _id:	data.id,
                name:	data.name,
                type:	data.type,
                dimension:	data.dimension,
                created:	day
            }

            console.log(`Fetch realizado.\nLocation: ${finaldata.dimension}, añadido\n`)
            await LocationCollection.insertOne(finaldata as Location)
            return finaldata

        }else{
            console.log(`Fetch no necesario.\nLocation: ${existe.dimension}, existe\n`)
            return existe
        }

    }catch(error){
        console.log(error)
        return error
        
    }

}