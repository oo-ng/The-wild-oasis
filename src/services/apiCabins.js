import supabase, {supabaseUrl} from "./supabase"
export const getCabins = async() =>{
    const { data: cabinsData, error }  = await supabase
    .from('Cabins')
    .select('*')

    if(error){
        console.error(error)
        throw new Error("Cabins could not be loaded")
    }
    return cabinsData
}

export const deleteCabin = async(id) =>{
    const { data, error } = await supabase
        .from('Cabins')
        .delete()
        .eq('id' , id)
    
    if(error){
        console.error(error)
        throw new Error("Cabins could not be deleted")
    }
    return data
}

export const createEditCabin = async(newCabinData, id)=>{
    console.log(newCabinData, id)
    const hasImagePath = newCabinData.image?.startsWith?.(supabaseUrl)
    console.log(hasImagePath)
    let query = supabase.from('Cabins')

    const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll("/","")
    const imagePath = hasImagePath? newCabinData.image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    
    if(!id){
        query = query.insert([{...newCabinData, image:imagePath}])      
    }else{
        query = query.update({...newCabinData, image:imagePath}).eq("id",id)
    }

    const  { data, error } = await query.select().single()

    if(error){
        console.error(error)
        throw new Error("Cabins could not be created")
    }
    
    if(!hasImagePath){
        const { error:storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabinData.image)
        if (storageError) {
            console.error("Cabin image could not be uploaded")
            await query.delete().eq('id' , data.id)
            throw new Error("Cabin image could not be uploaded and cabin was not created")
        }
    }    
    return data
}

