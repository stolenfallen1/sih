<script setup>
import { onUpdated } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());

const emits = defineEmits(['close-dialog']);

const closeDialog = () => {
    emits('close-dialog');
}

const createAccountStatement = async () => {
    let caseNo = selectedRowDetails.value.patient_registry[0].case_No;

    const blob = await useMethod("get", `generate-statement-summary/${caseNo}`, "", "");


    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');

}

onUpdated(() => {
    if (props.show) {
        createAccountStatement();
        closeDialog();
    }
});

</script>
