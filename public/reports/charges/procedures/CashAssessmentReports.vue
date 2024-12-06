<template>
    <main style="margin: 0; padding: 0;">
        <header class="header" style="display: flex; justify-content: space-between; align-items: center; flex-direction: row; gap: 8px; margin-bottom: 5px;">
            <div>
                <p style="margin: 0; font-weight: bold; font-size: 22px;">CEBU DOCTORS UNIVERSITY HOSPITAL, INC.</p>
                <p style="margin: 0; font-weight: bold;">Osmeña Blvd, Cebu City, 6000 Cebu</p>
                <p style="margin: 0; font-weight: bold;">TIN: 000-309-908-000-NV</p>
            </div>
            <div>
                <img src="/cdg_logo.png" width="80" height="80" style="margin-right: 12px;" />
                <img src="/cduh_logo.png" width="80" height="80" />
            </div>
        </header>
        <div style="display: flex; justify-content: space-between; align-items: start; margin: 0;">
            <section style="flex: 1;">
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Patient ID:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.patient_Id }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Patient Name:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.patient_Name }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">DOB:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.birthdate }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Age:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.age }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Sex:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.sex }}</span>
                </div>
            </section>
            <section style="flex: 1;">
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Account:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.account }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Registry No:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.case_No }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Charge Date & Time:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ chargeDate }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Physician:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.attending_Doctor_fullname }}</span>
                </div>
            </section>
        </div>
        <div style="margin-top: 12px;">
            <template v-if="groupedCharges">
                <template v-for="(charges, refNum) in groupedCharges" :key="refNum">
                    <p style="margin: 0;">CS #: {{ refNum }}</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 2px; text-align: left;">
                        <thead style="border-bottom: 1px solid #A9A9A9; border-top: 1px solid #A9A9A9;">
                            <tr>
                                <th style="font-size: 12px; width: 10%;">DEPT</th>
                                <th style="font-size: 12px; width: 15%;">CODE</th>
                                <th style="font-size: 12px; width: 45%;">PARTICULARS</th>
                                <th style="font-size: 12px; width: 10%;">QTY</th>
                                <th style="font-size: 12px; width: 20%">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(charge, index) in charges" :key="index" style="border-bottom: 1px solid #A9A9A9;">
                                <td style="font-size: 12px;">{{ charge.revenueID }}</td>
                                <td style="font-size: 12px;">{{ charge.itemID }}</td>
                                <td style="font-size: 12px;">{{ charge.revenueID == 'MD' ? charge.doctor_details?.doctor_name : charge.items?.exam_description }}</td>
                                <td style="font-size: 12px;">{{ charge.quantity }}</td>
                                <td style="font-size: 12px;">{{ usePeso(charge.amount) }}</td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align: right; font-size: 12px;">SUB-TOTAL:</td>
                                <td style="font-size: 12px;">{{ usePeso(groupSubTotal(refNum)) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <table style="width: 100%; margin-top: 10px;">
                    <thead style="border-bottom: 1px solid #A9A9A9; border-top: 1px solid #A9A9A9;">
                            <tr>
                                <th style="font-size: 12px; width: 10%;"></th>
                                <th style="font-size: 12px; width: 15%;"></th>
                                <th style="font-size: 12px; width: 45%;"></th>
                                <th style="font-size: 12px; width: 10%;"></th>
                                <th style="font-size: 12px; width: 20%"></th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td style="font-size: 12px;"></td>
                            <td style="font-size: 12px;"></td>
                            <td style="font-size: 12px;"></td>
                            <td style="font-size: 12px;"></td>
                            <td style="font-weight: bold; font-size: 14px;">GRAND TOTAL: <span style="text-decoration: underline;">{{ usePeso(grandTotal) }}</span></td>
                        </tr>
                    </tbody>
                </table>

            </template>
        </div>
        <div style="text-align: center;">
            <p style="text-decoration: underline;">VALID UNTIL TODAY</p>
        </div>
        <footer style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
            <div style="margin: 0;">
                <p style="margin: 0; font-size: 13px;">Processed by: <span style="">{{ chargeBy }}</span></p>
                <p style="margin: 0; font-size: 13px;">Print Date: <span style="">{{ printDate }}</span></p>
            </div>
            <!-- <div style="margin: 0; display: flex; justify-content: center; align-items: center;">
                <p style="font-size: 13px;">To check results online</p>
                <img src="/qr_code.png" width="100" height="100" />
            </div> -->
        </footer>
    </main>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        default: () => ({}),
        required: false,
    },
    charges: {
        type: Array,
        default: () => [],
        required: false,
    },
});

const chargeDate = ref('N/A');
const chargeBy = ref('N/A');
const printDate = ref(new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }));

const groupedCharges = computed(() => {
    const grouped = props.charges.reduce((acc, charge) => {
        if (!acc[charge.refNum]) {
            acc[charge.refNum] = [];
        }
        acc[charge.refNum].push(charge);
        return acc;
    }, {});
    return grouped;
})

const groupSubTotal = (refNum) => {
    if (!groupedCharges.value[refNum]) return 0;
    return groupedCharges.value[refNum].reduce((total, charge) => total + parseFloat(charge.amount), 0);
};

const grandTotal = computed(() => {
    return Object.values(groupedCharges.value).reduce((total, charges) => {
        return total + charges.reduce((subTotal, charge) => subTotal + parseFloat(charge.amount), 0);
    }, 0);
});

onMounted(() => {
    if (props.charges.length > 0) {
        chargeDate.value = useDateTimeFormater(props.charges[0].transdate);
        chargeBy.value = props.charges[0].userId;
    }
})
</script>
