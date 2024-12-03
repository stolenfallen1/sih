<script setup>
    import { onUpdated } from 'vue';

    const props = defineProps({
        show: {
            type: Boolean,
            default: () => false,
            required: true,
        },
    });

    const isLoading = ref(false);
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());

    const emits = defineEmits(['close-dialog']);

    const closeDialog = () => {
        emits('close-dialog');
    }

    const createAccountStatement = async () => {
        let caseNo = selectedRowDetails.value.patient_registry[0].case_No;
        try {
            const response = await useMethod("get", `generate-statement-summary/${caseNo}`, "", "");
            if (response) {
                const blobUrl = URL.createObjectURL(response);
                console.log('BLOB : ', blobUrl)
                window.open(blobUrl, '_blank');
            } else {
                useSnackbar(true, "red", response.message || 'Failed to generate statement');
                isLoading.value = false;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                useSnackbar(true, "red", error.response.message || 'Billing is empty');
            } else {
                useSnackbar(true, "red", error.response.message || 'Failed to generate statement');
            }
            isLoading.value = false;
        } finally {
            isLoading.value = false;
        }
    };

    onUpdated(() => {
        if (props.show) {
            createAccountStatement();
            closeDialog();
        }
    });

</script>
