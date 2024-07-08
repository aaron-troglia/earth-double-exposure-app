<script>
    export let submitForm;
	export let loading;
	export let errorMessage;
	let maxDate = new Date().toISOString().substring(0, 10);
</script>

<form class="mx-auto max-w-xl" on:submit|preventDefault={submitForm} id="userForm" method="POST" enctype="multipart/form-data">
	<div>
		<label class="mb-4 block">
			Enter a date<br />
			<input required class="shadow rounded p-2 w-full" max={maxDate} type="date" id="userDate" name="userDate" />
		</label>
	</div>
	<div>
		<label class="mb-4 block">
			Upload your image<br />
			<input required class="shadow rounded p-2 w-full bg-white" type="file" id="userImage" name="userImage" />
		</label>
	</div>
	<input 
		type="submit" 
		disabled={loading} 
		class="cursor-pointer shadow-lg hover:shadow transition duration-300 rounded py-2 px-4 ml-auto bg-blue-500 hover:bg-blue-700 block text-white" 
		value={loading ? 'Loading...' : 'Generate Image'} 
	/>
</form>
{#if errorMessage}
	<p class="max-w-xl mx-auto text-red-500 py-8">{errorMessage}</p>
{/if}

