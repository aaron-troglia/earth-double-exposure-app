<script>
    export let submitForm;
</script>

<form on:submit|preventDefault={submitForm} id="userForm" method="POST" enctype="multipart/form-data">
	<div>
		<label>
			What date has meaning to you?<br />
			<input type="date" id="userDate" name="userDate" />
		</label>
	</div>
	<div>
		<label>
			Upload your image<br />
			<input type="file" id="userImage" name="userImage" />
		</label>
	</div>
	<input type="submit" class="btn btn-primary" value="Generate Image" />
</form>

