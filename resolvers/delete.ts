
import { CharacterCollection,LocationCollection } from "../mongo/db.ts";


export const  deletecharacter =async (id: string): Promise<string> => {
    

    try{

        const ID:number = parseInt(id)
        console.log(id);
        

        const existe= await CharacterCollection.findOne({_id: ID})

        if(existe){

            await CharacterCollection.deleteOne({_id: ID})
            console.log(`\nCharacter: ${existe.name}, eliminado\n`)
            return `Character: ${existe.name}, eliminado`
            
        }else{
            throw String("no existe ese character")

        }

    }catch(error){
        console.log(error)
        return error
        
    }

}
export const  deletelocation =async (id: string): Promise<string> => {
    

    try{

        const ID:number = parseInt(id)
        console.log(id);
        

        const existe= await LocationCollection.findOne({_id: ID})

        if(existe){

            await LocationCollection.deleteOne({_id: ID})
            console.log(`\nLocation: ${existe.name}, eliminado\n`)
            return `Location: ${existe.name}, eliminado`
            
        }else{
            throw String("no existe ese Location")

        }

    }catch(error){
        console.log(error)
        return error
        
    }

}