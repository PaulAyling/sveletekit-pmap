<script>
    export let title
</script>
<h1>ImputBox</h1>

<div class="bg-red-400 p-4 m-2 rounded-md">
    <h1 class="pb-2">Please Enter a new state info here</h1>
    <input class="p-1 bg-gray-200 w-full" bind:value={title} placeholder="enter your name">
</div>