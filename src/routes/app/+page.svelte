<script>
     import "carbon-components-svelte/css/g10.css";
     import { MultiSelect } from "carbon-components-svelte";
     import { TextInput } from "carbon-components-svelte";
     import { NumberInput } from "carbon-components-svelte";


	

    //Fetch Data
    export let data
    export let form;
    //Convert Data
    const values = Object.values(data);
    let Country = '';
    $: e = ""
    let countries = values
    let userval = ""
    $: selectedIds = "";
    $: selectedValues = ""

    
    function submitForm() {
       
        const thisPatScen = {
            id: Math.random().toString(),
            Country: selectedIds.toString(),
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
            <NumberInput label="Translation Fees in € / Word" value={0.15} step={0.01} />

        <h3 style="margin-bottom:20px; margin-top:20px">Average Document</h3>
            <NumberInput label="Pages" value={22} />
            <NumberInput label="Drawings" value={2} />
            <NumberInput label="Claims" value={12} />
            <NumberInput label="Words" value={15000} />
            <NumberInput label="Words in Claims only" value={2275} />

        <h3 style="margin-bottom:20px; margin-top:20px">Patent Attorney Fees for national Applications</h3>
            <NumberInput label="Basic Fee (one time) €" value={800} />
            <NumberInput label="Quick examination (1-2 assesments/per year, 2 years) €" value={750} />
            <NumberInput label="Normal examination (2 assesments/per year, 3 years) €" value={1000} />
            <NumberInput label="Extended examination (3-5 assesments/per year, 6 years) €" value={1250} />

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