<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "~/components/common/CustomInput.vue";
import Navbar from "~/components/common/Navbar.vue";
import CustomButton from "~/components/common/CustomButton.vue";
import loginIlustration from "~/assets/images/login-illustration.png";
import { login } from "~/service/authApi";
import { getToken } from "~/service/cookies";

useSeoMeta({
	title: "Login",
});

const router = useRouter();
const emailIcon = "mdi:email";
const passwordIcon = "mingcute:lock-fill";

const passValid = ref({
	valid: true,
	text: "",
});

const emailValid = ref({
	valid: true,
	text: "",
});

const data = ref({
	email: "",
	password: "",
});

const isLoading = ref(false);
const isShowPassword = ref(false);

const copied = ref<string | null>(null);

const isValidEmail = (email: string) => {
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
	return emailRegex.test(email);
};

const onHandleShowPassword = (event: Event) => {
	const target = event.target as HTMLInputElement;
	isShowPassword.value = target.checked;
};

const onChangeDataHandler = (ev: Event) => {
	const target = ev.target as HTMLInputElement;
	const { name, value } = target;
	data.value[name as "email" | "password"] = value;

	if (name === "password") {
		if (data.value.password === "") {
			passValid.value = {
				valid: true,
				text: "",
			};
		} else if (data.value.password.length < 8) {
			passValid.value = {
				valid: false,
				text: "Password must be at least 8 characters",
			};
		} else {
			passValid.value = {
				valid: true,
				text: "",
			};
		}
	} else if (name === "email") {
		if (data.value.email === "") {
			emailValid.value = {
				valid: true,
				text: "",
			};
		} else if (!isValidEmail(value)) {
			emailValid.value = {
				valid: false,
				text: "Invalid email address",
			};
		} else {
			emailValid.value = {
				valid: true,
				text: "",
			};
		}
	}
};

const copyToClipboard = (elementId: string) => {
	const element = document.getElementById(elementId);

	if (element) {
		const text = element.innerText;

		navigator.clipboard
			.writeText(text)
			.then(() => {
				copied.value = elementId === "email-info" ? "Email" : "Password";
				setTimeout(() => {
					copied.value = null;
				}, 10000);
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	} else {
		console.error(`Element with ID "${elementId}" not found`);
	}
};

const onSubmitHandler = async () => {
	if (data.value.email !== "" && data.value.password !== "") {
		if (emailValid.value.valid && passValid.value.valid) {
			try {
				isLoading.value = true;
				await login(data.value.email, data.value.password);
				const token = getToken();
				if (token) {
					isLoading.value = false;
					router.push("/dashboard");
				}
			} catch (error: any) {
				isLoading.value = false;
				// console.log("Error login", error.response.data.error || "");
				alert(`${error.response.data.error}`);
			}
		} else {
			alert(`${emailValid.value.text} ${passValid.value.text}`);
		}
	} else {
		alert("Email dan password tidak boleh kosong");
	}
};
</script>

<template>
	<section class="md:mx-32 text-xl">
		<Navbar />
		<section class="flex flex-row max-h-screen sm:px-16 md:px-32 lg:px-44 px-12 md:py-44 py-16">
			<div class="hidden lg:block my-auto lg:2/3 xl:w-3/4 2xl:w-3/5 3xl:w-2/4 lg:pr-20 xl:pr-0 mt-[8rem]">
				<img :src="loginIlustration" alt="" class="lg:w-full xl:w-3/4" />
			</div>
			<div class="w-full 2xl:w-3/4 pt-[8rem]">
				<h1 class="font-bold text-gray-800 xsm:text-4xl md:text-5xl 2xl:text-6xl"><span class="text-blue-700">Login</span> Page</h1>
				<div class="border border-gray-300 border-b-4 rounded-full w-32 mt-6 2xl:mt-10"></div>
				<h3 class="text-2xl sm:text-3xl xl:text-4xl h-16 mt-4 bg-gradient-to-r from-blue-500 to-green-300 text-transparent bg-clip-text font-medium">Langkah Pertama Menuju Petualangan!</h3>
				<p class="text-gray-400 text-xl sm:text-2xl w-full xl:w-2/3 leading-relaxed">Kami merindukan Anda. Masukkan email dan password informasi akun Anda untuk melanjutkan.</p>
				<div class="flex flex-col space-y-4 mt-8">
					<label for="user-info" class="bg-blue-50 text-blue-500 py-2 px-4 rounded-lg font-semibold text-xl shadow-md border border-blue-600"> User Information : </label>
					<div class="flex flex-col space-y-2">
						<div class="flex items-center space-x-2">
							<p id="email-info" class="bg-white text-gray-800 py-2 px-4 rounded-lg text-xl border border-gray-300">eve.holt@reqres.in</p>
							<button @click="copyToClipboard('email-info')" class="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600">Copy Email</button>
						</div>
						<div class="flex items-center space-x-2">
							<p id="password-info" class="bg-white text-gray-800 py-2 px-4 rounded-lg text-xl border border-gray-300">cityslicka</p>
							<button @click="copyToClipboard('password-info')" class="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600">Copy Password</button>
						</div>
					</div>
					<p v-if="copied" class="text-green-600">Copied to clipboard!</p>
				</div>
				<form @submit.prevent="onSubmitHandler" class="mt-12 flex flex-col w-full">
					<CustomInput
						name="email"
						label="Email Kamu"
						inputStyle="bg-gray-50 border border-blue-200 text-gray-900 text-xl rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:w-3/4 pl-20 mt-4 p-2.5 h-16"
						inputType="text"
						placeholder="name@email.com"
						v-model="data.email"
						labelStyle="text-gray-900"
						iconStyle="pointer-events-none inset-y-0 left-0 pl-6"
						:handleChange="onChangeDataHandler"
						:leadingIcon="emailIcon"
						:error="emailValid.valid"
						:errorText="emailValid.text"
					/>
					<CustomInput
						name="password"
						label="Password Kamu"
						inputStyle="bg-gray-50 border border-blue-200 text-gray-900 text-xl rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:w-3/4 pl-20 mt-4 p-2.5 h-16"
						:inputType="isShowPassword ? 'text' : 'password'"
						placeholder="Password milik anda"
						v-model="data.password"
						labelStyle="text-gray-900"
						iconStyle="pointer-events-none inset-y-0 left-0 pl-6"
						:handleChange="onChangeDataHandler"
						:leadingIcon="passwordIcon"
						:error="passValid.valid"
						:errorText="passValid.text"
					/>
					<div class="flex flex-row items-center gap-2"><input type="checkbox" @click="onHandleShowPassword" /> Show Password</div>
					<div class="xl:w-1/4 lg:w-1/2 mt-10">
						<CustomButton
							:title="isLoading ? 'Loading' : 'Login'"
							textStyle="text-2xl font-semibold"
							:containerStyle="isLoading ? 'bg-blue-200' : 'bg-blue-600 w-full hover:bg-blue-500'"
							btnType="submit"
						/>
					</div>
					<p class="text-xl mt-4 text-gray-400">
						Belum memiliki akun?
						<span class="cursor-pointer hover:text-blue-500 text-blue-600 font-semibold"> register </span>
					</p>
				</form>
			</div>
		</section>
	</section>
</template>
