<script>
     import "carbon-components-svelte/css/g10.css";
     import { MultiSelect } from "carbon-components-svelte";
     import { TextInput } from "carbon-components-svelte";
     import { NumberInput } from "carbon-components-svelte";


	

    //Fetch Data
    export let data

    //Convert Data
    const values = Object.values(data);
    let Country = '';
    $: e = ""
    let countries = values
    let userval = ""
    // Input fields Config
    $: selectedIds = "";
    $: selectedValues = ""
    $: uip_translation_fee = 0.15
    $: uip_pages = 22
    $: uip_drawings = 2
    $: uip_claims = 12
    $: uip_words = 15000
    $: uip_words_claims = 2275
    $: uip_basic_fee = 800
    $: uip_quick_examination = 750
    $: uip_normal_examination = 1000
    $: uip_extended_examination = 1250
    

    //Put Input Fields into Array 'userval' after Submit
    function submitForm() {
       
        const thisPatScen = {
            id: Math.random().toString(),
            Country: selectedIds.toString(),
            uip_pages: uip_pages,
            uip_translation_fee:uip_translation_fee,
            uip_pages:uip_pages,
            uip_drawings:uip_drawings,
            uip_claims:uip_claims,
            uip_words:uip_words,
            uip_words_claims:uip_words_claims,
            uip_basic_fee:uip_basic_fee,
            uip_quick_examination:uip_quick_examination,
            uip_normal_examination:uip_normal_examination,
            uip_extended_examination:uip_extended_examination
        }
        userval = [thisPatScen, ...userval]
        console.log(userval)
    }
console.log(userval)
</script>

<div class="container m-8">
    <h1 class="text-2xl">Patscenario</h1>
    
    <form on:submit|preventDefault={submitForm}>
        <h3 style="margin-bottom:30px">Base Config</h3>
            <NumberInput name="uip_translation_fee" label="Translation Fees in € / Word" bind:value={uip_translation_fee} step={0.01} />

        <h3 style="margin-bottom:20px; margin-top:20px">Average Document</h3>
            <NumberInput name="uip_pages" label="Pages" bind:value={uip_pages} />
            <NumberInput name="uip_drawings" label="Drawings" bind:value={uip_drawings} />
            <NumberInput name="uip_claims" label="Claims" bind:value={uip_claims} />
            <NumberInput name="uip_words" label="Words" bind:value={uip_words} />
            <NumberInput name="uip_words_claims" label="Words in Claims only" bind:value={uip_words_claims} />

        <h3 style="margin-bottom:20px; margin-top:20px">Patent Attorney Fees for national Applications</h3>
            <NumberInput name="uip_basic_fee" label="Basic Fee (one time) €" bind:value={uip_basic_fee} />
            <NumberInput name="uip_quick_examination" label="Quick examination (1-2 assesments/per year, 2 years) €" bind:value={uip_quick_examination} />
            <NumberInput name="uip_normal_examination" label="Normal examination (2 assesments/per year, 3 years) €" bind:value={uip_normal_examination} />
            <NumberInput name="uip_extended_examination" label="Extended examination (3-5 assesments/per year, 6 years) €" bind:value={uip_extended_examination} />

        <h3 style="margin-bottom:20px; margin-top:20px">Country Data</h3>

        <MultiSelect
            bind:selectedIds
            titleText="In which countries is your product manufactured?"
            label=""
            name="fele"
            items={[
                { id: "Germany", text: "Germany", value:"Germany" },
                { id: "Australia", text: "Australia" },
                { id: "UK", text: "United Kingdom (EP)" },
            ]}

            />
        <button>submit</button><br>
        {JSON.stringify(userval)}
    </form>
    
    </div>