<script lang="ts">
    import ImagePreview from './ImagePreview.svelte';
    import UserImageForm from './UserImageForm.svelte';
	import axios from 'axios';

	let compositeURL = '';
	let loading = false;

	const sendForm = (form) => {
		loading = true;
		
		axios.post(
			'http://localhost:8080/upload',
			form
		).then((response) => {
			compositeURL = response.data.url;
			loading = false;
		});
	}
	
	const submitForm = async (e) => {
		const image = e.currentTarget.userImage;
		const date = e.currentTarget.userDate;
		compositeURL = '';

		console.log(image, date)
		
		let formData = new FormData(e.target);
		formData.append("date", date.value);
		formData.append("image", image.value);

		sendForm(formData);
	}
</script>

<UserImageForm {submitForm} loading={loading} />
<ImagePreview {compositeURL} />
