<script lang="ts">
	import { enhance as enhanceForm, type FormEnhanceProps } from '../actions/enhance'

	export let enhance: FormEnhanceProps
	export let method: string
	export let action: string
</script>

<form part="form" use:enhanceForm={enhance} {action} {method} {...$$restProps}>
	<slot />
</form>
