<script>
     import "carbon-components-svelte/css/g10.css";
     import { MultiSelect } from "carbon-components-svelte";

	

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
        <MultiSelect
            bind:selectedIds
            titleText=""
            label="Select Countries"
            name="fele"
            items={[
                { id: "Germany", text: "Germany" },
                { id: "Australia", text: "Australia" },
                { id: "UK", text: "United Kingdom (EP)" },
            ]}

            />
        <button>submit</button><br>
        {JSON.stringify(userval)}
    </form>
    
    </div>