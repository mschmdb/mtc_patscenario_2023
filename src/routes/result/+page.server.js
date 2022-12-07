import supabase from '$lib/db'


export const load = async function getData() {

  const { data, error } = await supabase
    .from('patscen')
    .select()
  if (error) throw new Error(error.message)
  
  return data
    }