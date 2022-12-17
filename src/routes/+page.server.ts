import supabase from '$lib/db'


// export const load = async function getData() {
  
//   const { data, error } = await supabase
//     .from('patscenario')
//     .select()
//   if (error) throw new Error(error.message)
  
//   return data
//     }

/** @type {import('./$types').PageServerLoad} */

export const load: PageServerLoad = async () => {
	try {
		const response = await supabase
			.from('patscenario')
			.select();

		const { data: responseData } = await response;
		return { ...responseData };
	} catch (error) {
		console.error(`Error in load function for /: ${error}`);
	}
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    console.log(formData)
  }
}