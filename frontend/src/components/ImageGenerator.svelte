<script lang="ts">
    import ImagePreview from './ImagePreview.svelte';
    import UserImageForm from './UserImageForm.svelte';
	import axios from 'axios';

	let earthURL = '';
	let userImgSrc = '';
	let compositeURL = '';

	const sendForm = (form) => {
		axios.post(
			'http://localhost:8080/upload',
			form
		).then((response) => {
			compositeURL = response.data.url;
		});
	}
	
	const submitForm = async (e) => {
		const image = document.getElementById("userImage");
		const date = document.getElementById("userDate");
		compositeURL = '';
		
		let formData = new FormData(e.target);
		formData.append("date", date.value);
		formData.append("image", image.value);

		sendForm(formData);
	}
</script>

<UserImageForm {submitForm} />
<ImagePreview {compositeURL} />


<style>
	#earthImage {
		width: 500px;
		height: 500px;
	}

	#userImage {
		position: absolute;
		top: 0;
		left: 0;
		width: 500px;
		height: 500px;
		mix-blend-mode: overlay;
		object-fit: cover;
		opacity: 1;
	}
</style>
