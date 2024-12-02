import supabase, { supabaseUrl } from "./supabase"

export const login = async ({email, password}) =>{
    let { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })
    
    if (error){
        throw new Error (error.message)
    }
    return data
}

export const getCurrentUser = async () =>{
    const {data: session } = await supabase.auth.getSession()
    if(!session.session) return null

    const {data, error } = await supabase.auth.getUser()

    if (error){
        throw new Error (error.message)
    }
    return data.user
}

export const logout = async() =>{
    const {error} = await supabase.auth.signOut()
    if(error){
        throw new error(error.message)
    }
}

export const signUp = async ({
    email, 
    password, 
    options:{
        data:{
            fullName, 
            avatar=""
        }}
    }) =>{
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                fullName,  // Add fullName as metadata
                avatar     // Add avatar as metadata
            }
        }
    })
    if (error) throw new Error(error.message)
        
    return data
}

export const updateCurrentUserInfo = async ({email, password, fullName, avatar}) =>{
    
    let updatedata;
    if(password){
        updatedata = {password}
    }
    if(fullName){
        updatedata = {
            
            data: {
                fullName: fullName
            }
            
        }
    }
    const { data, error } = await supabase.auth.updateUser(updatedata)
    if (error) throw new Error(error.message)
    if (!avatar) return data

    const filename = `avatar-${data.user.id}-${Math.random()}`
    const {error: storageError} = await supabase.storage.from('avatars').upload(filename, avatar)
    if (storageError) throw new Error(storageError.message)
    
    const {data: updatedUser, error: error2} =  await supabase.auth.updateUser({
        data:{
            avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${filename}`
        }
    })
    if (error2) throw new Error(error2.message)

    return updatedUser

  
}