<script>
    export let hoveringOverCardId
    export let childrenArr
    export let dndData
    import {flip} from 'svelte/animate';
    import Header from './header.svelte'
</script>

{#each childrenArr as child, childrenArrIndex (child)}
    <div animate:flip  >
    <ul
        class:hovering={dndData.hoveringOverCard === child.name}
        on:dragenter={() => dndData.hoveringOverCard = child.name}
        on:dragleave={() => dndData.hoveringOverCard = null}
        on:drop={event => dndData.functions.drop(event, childrenArrIndex)}
        ondragover="return false"
        class="bg-blue-200">
            <Header arr={child.items} basketIndex={childrenArrIndex} dragStart={dndData.functions.dragStart}/>    
        </ul>
    </div>
{/each}
<style>
	.hovering {
		border-color: orange;
	}

	li:hover {
		background: orange;
		color: white;
	}
  ul {
		border: solid lightgray 1px;
		display: flex; /* required for drag & drop to work when .item display is inline */
		height: 40px; /* needed when empty */
		padding: 10px;
	}
</style>