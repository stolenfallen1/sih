<template>
    <main style="margin: 0; padding: 0;">
        <header class="header" style="display: flex; justify-content: space-between; align-items: center; flex-direction: row; gap: 8px; margin-bottom: 5px;">
            <div>
                <p style="margin: 0; font-weight: bold; font-size: 22px;">{{ useGetUserDetails('branch')}}</p>
                <p style="margin: 0; font-weight: bold;">{{ useGetUserDetails('address') }}</p>
                <p style="margin: 0; font-weight: bold;">TIN: {{ useGetUserDetails('TIN') }}</p>
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
                    <span style="font-size: 13px; min-width: 150px;">Age:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.age }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Sex:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">
                        {{ payload.sex && payload.sex == 1 ? 'Male' : 'Female' }}
                    </span>
                </div>
            </section>
            <section style="flex: 1;">
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Account:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">
                        {{ payload.acount && payload.acount == '1' ? 'Cash' : 'Company / Insurance' }}
                    </span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Case No:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.case_No }}</span>
                </div>
                <div style="display: flex; margin: 5px 0;">
                    <span style="font-size: 13px; min-width: 150px;">Physician:</span>
                    <span style="font-size: 13px;  display: inline-block; min-width: 150px;">{{ payload.attending_Doctor_fullname }}</span>
                </div>
            </section>
        </div>
        <div style="margin-top: 8px;">
            <template v-if="groupedCharges">
                <template v-for="(charges, groupKey) in groupedCharges" :key="groupKey">
                    <p style="margin: 0; margin-top: 8px;">PHARMACY REFERENCE NO: 
                        <span style="font-weight: bolder;">{{ groupKey }}</span>
                    </p>
                    <table style="width: 100%; border-collapse: collapse; margin: 2px; text-align: left;">
                        <thead style="border-bottom: 1px solid #A9A9A9; border-top: 1px solid #A9A9A9;">
                            <tr>
                                <th style="font-size: 12px; width: 10%">DATE</th>
                                <th style="font-size: 12px; width: 10%;">DEPT</th>
                                <th style="font-size: 12px; width: 10%;">CODE</th>
                                <th style="font-size: 12px; width: 40%;">DESCRIPTION</th>
                                <th style="font-size: 12px; width: 10%;">DOSAGE</th>
                                <th style="font-size: 12px; width: 5%;">QTY</th>
                                <th style="font-size: 12px; width: 15%">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in charges" :key="index" style="border-bottom: 1px solid #A9A9A9;">
                                <td style="font-size: 12px;">{{ useDateMMDDYYY(item.created_at) }}</td>
                                <td style="font-size: 12px;">{{ item.nurse_logbook.revenue_Id }}</td>
                                <td style="font-size: 12px;">{{ item.nurse_logbook.item_Id }}</td>
                                <td style="font-size: 12px;">{{ item.nurse_logbook.description }}</td>
                                <td style="font-size: 12px;">{{ item.nurse_logbook.dosage }}</td>
                                <td style="font-size: 12px;">{{ parseInt(item.transaction_Qty) }}</td>
                                <td style="font-size: 12px;">{{ usePeso(item.transaction_Item_TotalAmount) }}</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: right; font-size: 12px;">PROCESSED BY:</td>
                                <td style="font-size: 12px; font-weight: bold;">{{ processedBy[groupKey] }}</td>
                                <td colspan="6" style="text-align: right; font-size: 12px;">SUB-TOTAL:</td>
                                <td style="font-size: 12px;">{{ usePeso(groupSubTotal(groupKey)) }}</td>
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
                            <td style="font-weight: bold; font-size: 14px;">GRAND TOTAL: 
                                <span style="border-bottom: 1px solid #000;">{{ usePeso(grandTotal) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </template>
        </div>
        <footer style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
            <div style="margin: 0;">
                <!-- <p style="margin: 0; font-size: 13px;">Requested by: <span style="border-bottom: 1px solid #000;">{{ requestedBy }}</span></p> -->
                <p style="margin: 0; font-size: 13px;">Printed by: <span style="border-bottom: 1px solid #000;">{{ printedBy }}</span></p>
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
import nuxtStorage from 'nuxt-storage';

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

const user_detail = ref({});

const printedBy = ref("");
const printDate = ref(new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }));

const groupedCharges = computed(() => {
    const grouped = props.charges.reduce((acc, charge) => {
        const groupKey = charge.trasanction_Reference_Number;
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(charge);
        return acc;
    }, {});
    return grouped;
});

const processedBy = computed(() => {
    const result = {};
    for (const [groupKey, charges] of Object.entries(groupedCharges.value)) {
        const firstProcessedBy = charges.find(charge => charge.nurse_logbook.process_By)?.nurse_logbook.process_By;
        result[groupKey] = firstProcessedBy || 'N/A'; 
    }
    return result;
});


const groupSubTotal = (groupKey) => {
    if (!groupedCharges.value[groupKey]) return 0;
    return groupedCharges.value[groupKey].reduce((total, charge) => total + parseFloat(charge.transaction_Item_TotalAmount), 0);
};

const grandTotal = computed(() => {
    return Object.values(groupedCharges.value).reduce((total, charges) => {
        return total + charges.reduce((subTotal, charge) => subTotal + parseFloat(charge.transaction_Item_TotalAmount), 0);
    }, 0);
});

onMounted(() => {
    const userDetails = JSON.parse(nuxtStorage.localStorage.getData('user_details') || '{}');
    user_detail.value = userDetails;
    printedBy.value = user_detail.value?.idnumber;
    console.log("TEST", user_detail.value);
});
</script>
