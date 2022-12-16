<script>
	import 'carbon-components-svelte/css/g10.css';
	import { MultiSelect } from 'carbon-components-svelte';
	import { TextInput } from 'carbon-components-svelte';
	import { NumberInput } from 'carbon-components-svelte';
	import { Accordion, AccordionItem } from 'carbon-components-svelte';
	import { Toggle } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import { DataTable, Link } from 'carbon-components-svelte';
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte';
	import { Select, SelectItem } from 'carbon-components-svelte';
	import { chosencountries, storeTableData, storeUserVal } from './stores.js';
	import AppResult from '../../components/AppResult.svelte';
    import { fade, fly } from 'svelte/transition';


	// import AppForm from "../../components/AppForm.svelte";

	//Fetch Data
	export let data;

	//Convert Data
	const values = Object.values(data);
	console.log(values);
	let countries = values;
	let userval = '';
	//Show Results?

	$: showResults = false;
	$: editForm = true;
	// Input fields Config
	$: uip_multiselect_country_filing = 'DE, CH';
	$: uip_multiselect_country_filing_Lang = 'DE';
	$: uip_multiselect_country_filing_subsequent = '';
	$: selectedIds = '';
	$: uip_translation_fee = 0.15;
	$: uip_pages = 22;
	$: uip_drawings = 2;
	$: uip_claims = 12;
	$: uip_words = 15000;
	$: uip_words_claims = 2275;
	$: uip_basic_fee = 800;
	$: uip_quick_examination = 750;
	$: uip_normal_examination = 1000;
	$: uip_extended_examination = 1250;
	$: uip_complexity = 'quick';
	$: dynamic_table_rows = '';
	// $: chosencountries = [];


	//Put Input Fields into Array 'userval' after Submit
	function submitForm() {
		const thisPatScen = {
			id: Math.random().toString(),
			uip_multiselect_country_filing: uip_multiselect_country_filing.toString(),
			uip_multiselect_country_filing_subsequent:
				uip_multiselect_country_filing_subsequent.toString(),
			uip_pages: uip_pages,
			uip_translation_fee: uip_translation_fee,
			uip_drawings: uip_drawings,
			uip_claims: uip_claims,
			uip_words: uip_words,
			uip_words_claims: uip_words_claims,
			uip_basic_fee: uip_basic_fee,
			uip_quick_examination: uip_quick_examination,
			uip_normal_examination: uip_normal_examination,
			uip_extended_examination: uip_extended_examination,
			uip_multiselect_country_filing_Lang: uip_multiselect_country_filing_Lang.toString(),
			uip_complexity: uip_complexity
		};
		showResults = true;
		editForm = false;
		userval = [thisPatScen, ...userval];
		// Set global Store
		storeUserVal.set(userval);

		console.log('Userval', userval);

		// THIS NEEDS TO BE LOOKED AT, + might be a bad way to do (but hey, it surprisingly works)
		let countrydatatemp = userval.map((value) => {
			return {
				country_code: value.uip_multiselect_country_filing
			};
		});
		console.log('ChosenC', countrydatatemp);
		// Set global Store
		chosencountries.set(countrydatatemp);

		let tabledatatemp = values.filter((value) =>
			countrydatatemp[0].country_code.includes(value.country_code)
		);
		// Set global Store
		storeTableData.set(tabledatatemp);
		console.log('FilteredTable', $storeTableData);
	}

    
	//  Filter the contents of chosen countries for Table display
	function filterTable(arr, filterId) {
		return [
			...arr.filter(
				(obj) =>
					filterId && filterId.country_code && filterId.country_code.split(',').includes(obj.id)
			)
		];
	}

	//building the array for the multiselect-fields
	const transformedvalues = values.map((value) => {
		return { id: value.country_code, text: value.country_name };
	});
	const transformedvaluesLang = values.map((value) => {
		return { id: value.country_code, text: value.country_code };
	});

	//building the array for the data-table
	const transformedvaluesForTable = values.map((value) => {
		return {
			id: value.country_code,
			name: value.country_name,
			filing_fee: value.filing_fee,
			publication_fee: value.publication_fee,
			year_8: value.maintenance_year_08,
			year_9: value.maintenance_year_09,
			sum:
				value.publication_fee +
				value.filing_fee +
				value.maintenance_year_08 +
				value.maintenance_year_09
		};
	});
	console.log('Tabledata', transformedvaluesForTable);
</script>

<div class="container m-8">
	<h1 class="text-2xl">Patscenario</h1>
	{#if editForm}
		<form on:submit|preventDefault|stopPropagation={submitForm} in:fade out:fade>
			<h2 style="margin-bottom:30px">Base Config</h2>
			<MultiSelect
				bind:selectedIds={uip_multiselect_country_filing}
				titleText="First filing in "
				label="(currently only DE possible)"
				name="uip_multiselect_country_filing"
				required="true"
				disabled="true"
				placeholder="DE"
				items={transformedvalues}
			/>
			<MultiSelect
				bind:selectedIds={uip_multiselect_country_filing_Lang}
				titleText="Languages in which the first filing is available"
				label=""
				name="uip_country_filing_lang"
				required="true"
				items={[
                    { id: "DE", text: "German" },
                    { id: "EN", text: "English" },
                    { id: "ES", text: "Spanish" },
                ]}
			/>

			<NumberInput
				name="uip_translation_fee"
				label="Translation Fees in € / Word"
				bind:value={uip_translation_fee}
				step={0.01}
			/>

			<h2 style="margin-bottom:20px; margin-top:20px">Average Document</h2>
			<NumberInput name="uip_pages" label="Pages" bind:value={uip_pages} />
			<NumberInput name="uip_drawings" label="Drawings" bind:value={uip_drawings} />
			<NumberInput name="uip_claims" label="Claims" bind:value={uip_claims} />
			<NumberInput name="uip_words" label="Words" bind:value={uip_words} />
			<NumberInput
				name="uip_words_claims"
				label="Words in Claims only"
				bind:value={uip_words_claims}
			/>

			<h2 style="margin-bottom:20px; margin-top:20px">
				Patent Attorney Fees for national Applications
			</h2>
			<NumberInput name="uip_basic_fee" label="Basic Fee (one time) €" bind:value={uip_basic_fee} />
			<NumberInput
				name="uip_quick_examination"
				label="Quick examination (1-2 assesments/per year, 2 years) €"
				bind:value={uip_quick_examination}
			/>
			<NumberInput
				name="uip_normal_examination"
				label="Normal examination (2 assesments/per year, 3 years) €"
				bind:value={uip_normal_examination}
			/>
			<NumberInput
				name="uip_extended_examination"
				label="Extended examination (3-5 assesments/per year, 6 years) €"
				bind:value={uip_extended_examination}
			/>

			<h2 style="margin-bottom:20px; margin-top:20px">Complexity</h2>

			<Select
				name="uip_complexity"
				helperText="tbd: Estimated date for granting the patent"
				labelText="Complexity"
				bind:selected={uip_complexity}
			>
				<SelectItem value="quick" text="quick" />
				<SelectItem value="normal" text="normal" />
				<SelectItem value="extended" text="extended" />
			</Select>
			<MultiSelect
				bind:selectedIds={uip_multiselect_country_filing_subsequent}
				titleText="Subsequent application in the following countries"
				label=""
				name="uip_multiselect_country_filing_subsequent"
				required="true"
				placeholder="UK"
				items={transformedvalues}
			/>

			<Button kind="secondary" type="submit" style="margin-top:30px; background-color:#890c58"
				>Submit</Button
			>

			<br /><br />
		</form>
	{/if}
	{#if showResults == true || editForm == false}
		<AppResult  />
		
		<Button on:click={() => ((editForm = true), (showResults = false))}>Edit Results</Button>
	{/if}

	<!-- {JSON.stringify(userval)} -->
</div>
