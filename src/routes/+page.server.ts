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

/** @type {import('./$types').Actions} */
export const actions = {
	formcalc: async ({ request }) => {
		const data = await request.formData();
		const uip_multiselect_country_filing = data.get('uip_multiselect_country_filing_value');
		const uip_multiselect_country_filing_subsequent = data.get('uip_multiselect_country_filing_subsequent_value');
		const uip_pages = data.get('uip_pages');
		const uip_translation_fee = data.get('uip_translation_fee');
		const uip_drawings = data.get('uip_drawings');
		const uip_claims = data.get('uip_claims');
		const uip_words = data.get('uip_words');
		const uip_words_claims = data.get('uip_words_claims');
		const uip_basic_fee = data.get('uip_basic_fee');
		const uip_quick_examination = data.get('uip_quick_examination');
		const uip_normal_examination = data.get('uip_normal_examination');
		const uip_extended_examination = data.get('uip_extended_examination');
		const uip_multiselect_country_filing_Lang = data.get('uip_multiselect_country_filing_Lang_value');
		const uip_multiselect_country_filing_Lang_value = data.get('uip_multiselect_country_filing_Lang_value');
		const uip_complexity = data.get('uip_complexity');

		const userChosen = {
			uip_multiselect_country_filing,
			uip_multiselect_country_filing_subsequent,
			uip_pages,
			uip_translation_fee,
			uip_drawings,
			uip_claims,
			uip_words,
			uip_words_claims,
			uip_basic_fee,
			uip_quick_examination,
			uip_normal_examination,
			uip_extended_examination,
			uip_multiselect_country_filing_Lang,
			uip_multiselect_country_filing_Lang_value,
			uip_complexity
		}

		
		return {
			success: true,
			userChosen,
			uip_multiselect_country_filing,
			uip_multiselect_country_filing_subsequent,
			uip_pages,
			uip_translation_fee,
			uip_drawings,
			uip_claims,
			uip_words,
			uip_words_claims,
			uip_basic_fee,
			uip_quick_examination,
			uip_normal_examination,
			uip_extended_examination,
			uip_multiselect_country_filing_Lang,
			uip_multiselect_country_filing_Lang_value,
			uip_complexity,
		};

	}
};