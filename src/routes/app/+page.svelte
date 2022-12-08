<script>
     import "carbon-components-svelte/css/g10.css";
     import { MultiSelect } from "carbon-components-svelte";
     import { TextInput } from "carbon-components-svelte";
     import { NumberInput } from "carbon-components-svelte";
     import { Accordion, AccordionItem } from "carbon-components-svelte";
     import { Toggle } from "carbon-components-svelte";
     import { Button } from "carbon-components-svelte";



	

    //Fetch Data
    export let data

    //Convert Data
    const values = Object.values(data);
    let countries = values
    let userval = ""
    // Input fields Config
    $: uip_country_manufactured = '';
    $: selectedIds = "";
    $: uip_country_manufactured_relocation = ""
    $: uip_countries_sales_opportunities = ""
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
    $: uip_relocated_country_infringements = false
    $: uip_countries_sales_opportunities_represented_toggle = false
    $: uip_countries_sales_opportunities_future_toggle = false
    $: uip_countries_sales_opportunities_enforcing_toggle = false
    

    //Put Input Fields into Array 'userval' after Submit
    function submitForm() {
        
        const thisPatScen = {
            id: Math.random().toString(),
            uip_country_manufactured: uip_country_manufactured.toString(),
            uip_country_manufactured_relocation:uip_country_manufactured_relocation.toString(),
            uip_countries_sales_opportunities:uip_countries_sales_opportunities.toString(),
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
            uip_extended_examination:uip_extended_examination,
            uip_relocated_country_infringements:uip_relocated_country_infringements,
            uip_countries_sales_opportunities_represented_toggle:uip_countries_sales_opportunities_represented_toggle,
            uip_countries_sales_opportunities_future_toggle:uip_countries_sales_opportunities_future_toggle,
            uip_countries_sales_opportunities_enforcing_toggle:uip_countries_sales_opportunities_enforcing_toggle
        }
        open = false,
        userval = [thisPatScen, ...userval]
        console.log(userval)
        console.log(open)
    }
console.log(userval)
console.log(data)
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
            bind:selectedIds={uip_country_manufactured}
            titleText="In which countries is your product manufactured?"
            label=""
            name="uip_country_manufactured"
            items={[
                { id: "Germany", text: "Germany", value:"Germany" },
                { id: "Australia", text: "Australia" },
                { id: "UK", text: "United Kingdom (EP)" },
            ]}

        />
        <MultiSelect
            bind:selectedIds={uip_country_manufactured_relocation}
            titleText="Can the manufacturing site be quickly relocated to other countries? In which?"
            label=""
            name="uip_country_manufactured_relocation"
            items={[
                { id: "Germany", text: "Germany", value:"Germany" },
                { id: "Australia", text: "Australia" },
                { id: "UK", text: "United Kingdom (EP)" },
            ]}

        />
        <Toggle name="uip_relocated_country_infringements" 
        labelText="Can you track patent infringements in the country?" labelA="No" labelB="Yes" bind:toggled={uip_relocated_country_infringements} />
        <MultiSelect
            bind:selectedIds={uip_countries_sales_opportunities}
            titleText="In which countries do you see your greatest sales opportunities?"
            label=""
            name="uip_countries_sales_opportunities"
            items={[
                { id: "Germany", text: "Germany", value:"Germany" },
                { id: "Australia", text: "Australia" },
                { id: "UK", text: "United Kingdom (EP)" },
            ]}

        />
        <Toggle name="uip_countries_sales_opportunities_represented_toggle" 
        labelText="Are you already represented in these markets?" labelA="No" labelB="Yes" bind:toggled={uip_countries_sales_opportunities_represented_toggle} />
        <Toggle name="uip_countries_sales_opportunities_future_toggle" 
        labelText="Do you want to work on these markets in the future?" labelA="No" labelB="Yes" bind:toggled={uip_countries_sales_opportunities_future_toggle} />
        <Toggle name="uip_countries_sales_opportunities_enforcing_toggle" 
        labelText="Are you able/do you want to seriously enforce your rights in these countries?" labelA="No" labelB="Yes" bind:toggled={uip_countries_sales_opportunities_enforcing_toggle} />

        <Button kind="secondary" type="submit" style="margin-top:30px; background-color:#890c58">Submit</Button>

        <br><br>
        {JSON.stringify(userval)}
    </form>
    
    </div>