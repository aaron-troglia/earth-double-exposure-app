<script lang="ts">
    import ImagePreview from './ImagePreview.svelte';
    import UserImageForm from './UserImageForm.svelte';
	import axios from 'axios';

	let compositeURL = '';
	let loading = false;
	let errorMessage = '';
	
	const submitForm = (e) => {
		loading = true;
		const image = e.currentTarget.userImage;
		const date = e.currentTarget.userDate;
		compositeURL = '';
		errorMessage = '';
		
		let formData = new FormData(e.target);
		formData.append("date", date.value);
		formData.append("image", image.value);

		axios.post(
			'http://localhost:8080/upload',
			formData
		).then((response) => {
			compositeURL = response.data.url;
		}).catch((reason) => {
			errorMessage = 'There has been an error: ' + reason.message;
		}).finally(() => {
			loading = false;
		});
	}
</script>

<UserImageForm {submitForm} {loading} {errorMessage} />
<ImagePreview {compositeURL} />
