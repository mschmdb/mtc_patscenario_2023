<script lang="ts">
	import 'carbon-components-svelte/css/g10.css';
	import { MultiSelect } from 'carbon-components-svelte';
	import { NumberInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import { chosencountries, storeTableData, storeUserCho, supaData } from '../routes/stores.js';
	import { enhance } from '$app/forms';
	import { Select, SelectItem } from 'carbon-components-svelte';

	export let uip_translation_fee;
	export let uip_pages;
	export let form;

	const transformedvalues = Object.values($supaData).map((value) => {
		return { id: value.country_code, text: value.country_name };
	});
	const transformedvaluesLang = Object.values($supaData).map((value) => {
		return { id: value.country_code, text: value.country_code };
	});

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
</script>

<form
	method="POST"
	action="?/formcalc"
	use:enhance={() =>
		({ update }) =>
			update({ reset: false })}
>
	<h2 style="margin-bottom:30px">Base Config</h2>
	<MultiSelect
		bind:selectedIds={uip_multiselect_country_filing}
		titleText="First filing in "
		label="(currently only DE possible)"
		name="uip_multiselect_country_filing"
		required
		disabled="true"
		placeholder="DE, CH"
		items={transformedvalues}
	/>
	<input
		type="hidden"
		name="uip_multiselect_country_filing_value"
		value={uip_multiselect_country_filing}
	/>

	<MultiSelect
		bind:selectedIds={uip_multiselect_country_filing_Lang}
		titleText="Languages in which the first filing is available"
		label=""
		name="uip_multiselect_country_filing_Lang"
		required="true"
		items={[
			{ id: 'DE', text: 'German' },
			{ id: 'EN', text: 'English' },
			{ id: 'ES', text: 'Spanish' }
		]}
	/>
	<input
		type="hidden"
		name="uip_multiselect_country_filing_Lang_value"
		value={uip_multiselect_country_filing_Lang}
	/>

	<NumberInput
		name="uip_translation_fee"
		label="Translation Fees in € / Word"
		bind:value={uip_translation_fee}
		step={0.01}
	/>

	<h2 style="margin-bottom:20px; margin-top:20px">Average Document</h2>
	<NumberInput name="uip_pages" label="Pages" value={form?.uip_pages ?? uip_pages} />
	<NumberInput name="uip_drawings" label="Drawings" value={form?.uip_drawings ?? uip_drawings} />
	<NumberInput name="uip_claims" label="Claims" value={form?.uip_claims ?? uip_claims} />
	<NumberInput name="uip_words" label="Words" value={form?.uip_words ?? uip_words} />
	<NumberInput
		name="uip_words_claims"
		label="Words in Claims only"
		value={form?.uip_words_claims ?? uip_words_claims}
	/>

	<h2 style="margin-bottom:20px; margin-top:20px">
		Patent Attorney Fees for national Applications
	</h2>
	<NumberInput
		name="uip_basic_fee"
		label="Basic Fee (one time) €"
		value={form?.uip_basic_fee ?? uip_basic_fee}
	/>
	<NumberInput
		name="uip_quick_examination"
		label="Quick examination (1-2 assesments/per year, 2 years) €"
		value={form?.uip_quick_examination ?? uip_quick_examination}
	/>
	<NumberInput
		name="uip_normal_examination"
		label="Normal examination (2 assesments/per year, 3 years) €"
		value={form?.uip_normal_examination ?? uip_normal_examination}
	/>
	<NumberInput
		name="uip_extended_examination"
		label="Extended examination (3-5 assesments/per year, 6 years) €"
		value={form?.uip_extended_examination ?? uip_extended_examination}
	/>

	<h2 style="margin-bottom:20px; margin-top:20px">Complexity</h2>

	<Select
		name="uip_complexity"
		helperText="tbd: Estimated date for granting the patent"
		labelText="Complexity"
		selected={form?.uip_complexity ?? uip_complexity}
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
	<input
		type="hidden"
		name="uip_multiselect_country_filing_subsequent_value"
		value={uip_multiselect_country_filing_subsequent}
	/>

	<Button
		kind="secondary"
		type="submit"
		style="margin-top:30px; background-color:#890c58"
		on:click={() => ((editForm = true), (showResults = true))}>Submit</Button
	>

	<br /><br />
</form>
