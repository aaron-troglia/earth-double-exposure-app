<script lang="ts">
    import ImagePreview from './ImagePreview.svelte';
    import UserImageForm from './UserImageForm.svelte';
	import axios from 'axios';

	let earthURL = '';
	let userImgSrc = '';
	let compositeURL = '';

	const uploadImage = (img) => {
		console.log(img);
		axios.post(
			'http://localhost:8080/upload',
			img
		);
	}
	
	const submitForm = async (e) => {
		let formData = new FormData(e.target);
		const data:any = {};

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		uploadImage(data);

		if (data.userDate) {
			try {
				const response = await axios.get(`http://localhost:8080/earth/${data.userDate}`);
				const image = response.data.url;

				earthURL = 'http://localhost:8080/' + image;

			} catch (error) {
				console.error(error);
			} 
		}
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
