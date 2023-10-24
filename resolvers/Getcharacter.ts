import { Character,Apierror } from "../mongo/types.ts";
import { CharacterCollection } from "../mongo/db.ts";

const url = "https://rickandmortyapi.com/api/character"

export const  getcharacter =async (id: string): Promise<Character> => {
    

    try{

        if(id==="remove") {
            await CharacterCollection.deleteMany({})
            throw String("characters, eliminados.")       
        }


        const existe = await CharacterCollection.findOne({_id: parseInt(id)})

        if(!existe){

            const response = await  fetch(`${url}/${id}`)

            if(response.status!==200){
                
                const error: Apierror = await response.json()
                
                throw error;
            }
            
            const data: Character = await response.json()
            
            const date: string | undefined = data.created?.toString()
        
            const day: string  =date?.substring(8,10)+"-"+date?.substring(5,7)+"-"+date?.substring(0,4)   
        
            const finaldata:Character = {
                _id: data.id,
                name: data.name,
                status: data.status,
                species: data.species,
                gender: data.gender,
                origin: {
                    name: data.origin?.name
                },
                location: {
        
                    name: data.location?.name,
                    
                },
                created: day
            }
        
            console.log(`Fetch realizado.\nCharacter: ${finaldata.name}, añadido`)
            await CharacterCollection.insertOne(finaldata as Character)
            return finaldata
        }else{
            console.log(`Fetch no necesario.\nCharacter: ${existe.name}, existe\n`)
            return existe
        }

    }catch(error){
        console.log(error)
        return error
        
    }

}