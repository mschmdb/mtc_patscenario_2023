<script>
    import "carbon-components-svelte/css/g10.css";
    import { MultiSelect } from "carbon-components-svelte";
    import { TextInput } from "carbon-components-svelte";
    import { NumberInput } from "carbon-components-svelte";
    import { Accordion, AccordionItem } from "carbon-components-svelte";
     import { Toggle } from "carbon-components-svelte";
     import { Button } from "carbon-components-svelte";
     import { DataTable, Link } from "carbon-components-svelte";
     import Launch from "carbon-icons-svelte/lib/Launch.svelte";
    export let uip_translation_fee
    export let uip_pages
</script>
<form on:submit|preventDefault={submitForm}>
    <h3 style="margin-bottom:30px">Base Config</h3>
        <NumberInput name="uip_translation_fee" label="Translation Fees in € / Word" bind:value={uip_translation_fee} step={0.01} />
        <NumberInput name="uip_pages" label="Pages" bind:value={uip_pages} />
    
    
</form>