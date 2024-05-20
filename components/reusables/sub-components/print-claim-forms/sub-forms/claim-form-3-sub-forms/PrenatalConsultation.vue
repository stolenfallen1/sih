<template>
    <v-container>
        <v-row style="display: flex; align-items: center">
            <p>Initial Prenatal Consultation</p>
            <v-col cols="4">
                <v-text-field
                    label=""
                    type="date"
                    v-model="payload.initial_prenatal_consultation"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <p  style="font-style: italic; font-weight: bold;">Clinical History and Physical Examination</p>
        </v-row>
        <v-row style="display: flex; align-items: center;">
            <v-col cols="6">
                <v-checkbox label="Vital Signs are normal" v-model="isVitalSignsNormal" density="compact" hide-details></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox label="Vital Signs are normal" v-model="isVitalSignsNormal" density="compact" hide-details></v-checkbox>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center" class="form-col">
            <v-col cols="6">
                <v-text-field
                    label="Menstrual History"
                    v-model="payload.menstrual_history"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="Age of Menarche"
                    v-model="payload.age_of_menarche"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center;">
            <p class="form-col">Obstetric History</p>
            <v-col cols="2" class="form-col">
                <v-text-field
                    label="G"
                    v-model="payload.g"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="form-col">
                <v-text-field
                    label="T"
                    v-model="payload.t"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="form-col">
                <v-text-field
                    label="P"
                    v-model="payload.p"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="form-col">
                <v-text-field
                    label="A"
                    v-model="payload.a"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="form-col">
                <v-text-field
                    label="L"
                    v-model="payload.l"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <p style="font-style: italic; font-weight: bold;">Obstetric risk factors</p>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <v-col cols="4">
                <v-checkbox label="Multiple pregnancy" density="compact" hide-details v-model="payload.isMultiplePregnancy"></v-checkbox>
            </v-col>
            <v-col cols="4">
                <v-checkbox label="Placenta previa" density="compact" hide-details v-model="payload.isPlacentaPrevia"></v-checkbox>
            </v-col>
            <v-col cols="4">
                <v-checkbox label="History of pre-clampsia" density="compact" hide-details v-model="payload.isHistoryPreClampsia"></v-checkbox>
            </v-col>
            <v-col cols="4" class="form-col">
                <v-checkbox label="Ovarian cyst" density="compact" hide-details v-model="payload.isOvarianCyst"></v-checkbox>
            </v-col>
            <v-col cols="4" class="form-col">
                <v-checkbox label="History of 3 miscarriages" density="compact" hide-details v-model="payload.isWith3Miscarriages"></v-checkbox>
            </v-col>
            <v-col cols="4" class="form-col">
                <v-checkbox label="History of eclampsia" density="compact" hide-details v-model="payload.isWithEclampsia"></v-checkbox>
            </v-col>
            <v-col cols="4" class="form-col">
                <v-checkbox label="Myomauteri" density="compact" hide-details v-model="payload.isWithMyomauteri"></v-checkbox>
            </v-col>
            <v-col cols="4" class="form-col">
                <v-checkbox label="History of still birth" density="compact" hide-details v-model="payload.isHistoryStillBirth"></v-checkbox>
            </v-col>
            <v-col cols="4" class="form-col">
                <v-checkbox label="Premature contraction" density="compact" hide-details v-model="payload.isPrematureContraction"></v-checkbox>
            </v-col>
        </v-row>
        <v-row>
            <p  style="font-style: italic; font-weight: bold;">Medical / Surgical risk factors</p>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <v-col cols="3">
                <v-checkbox label="Hypertension" density="compact" hide-details v-model="payload.isHyperExtension"></v-checkbox>
            </v-col>
            <v-col cols="3">
                <v-checkbox label="Thyroid Disorder" density="compact" hide-details v-model="payload.isThyroidDisorder"></v-checkbox>
            </v-col>
            <v-col cols="3">
                <v-checkbox label="Epilepsy" density="compact" hide-details v-model="payload.isEpilepsy"></v-checkbox>
            </v-col>
            <v-col cols="3">
                <v-checkbox label="History of previous cesarian operation" density="compact" hide-details v-model="payload.isWithCesarianOperation"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="Heart Disease" density="compact" hide-details v-model="payload.isHeartDisease"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="Obesity" density="compact" hide-details v-model="payload.isObesity"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="Renal Disease" density="compact" hide-details v-model="payload.isRenalDisease"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="History of uterine mynomectomy" density="compact" hide-details v-model="payload.isWithUterineMynomectomy"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="Diabetes" density="compact" hide-details v-model="payload.isDiabetes"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="Moderate to Severe Asthma" density="compact" hide-details v-model="payload.isWithSevereAsthma"></v-checkbox>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-checkbox label="Bleeding Disorders" density="compact" hide-details v-model="payload.isWithBleedingDisorders"></v-checkbox>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <p>Admitting Diagnosis</p>
            <v-col cols="10">
                <v-textarea
                    variant="outlined"
                    density="compact"
                    hide-details
                    v-model="payload.admitting_diagnosis"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <p style="font-style: italic; font-weight: bold;">Delivery Plan</p>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <p class="form-col">Orientation to MCP / Availment of Benefits</p>
            <v-col cols="4">
                <v-radio-group inline v-model="isOrientationToMCP">
                    <v-radio label="Yes" value="0" density="compact" hide-details></v-radio>
                    <v-radio label="No" value="1" density="compact" hide-details></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="3" class="form-col">
                <v-text-field
                    label="Expected Delivery Date"
                    v-model="payload.expected_delivery_date"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <p style="font-style: italic; font-weight: bold;">Follow-up Prenatal Consultation</p>
        </v-row>
        <v-row>
            <v-table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Prenatal Consultation No.</th>
                        <th>2nd</th>
                        <th>3rd</th>
                        <th>4th</th>
                        <th>5th</th>
                        <th>6th</th>
                        <th>7th</th>
                        <th>8th</th>
                        <th>9th</th>
                        <th>10th</th>
                        <th>11th</th>
                        <th>12th</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                        <td><input type="text" v-model="row.firstColumn" disabled /></td>
                        <td width="225px"><input type="date" v-model="row.secondColumn" /></td>
                        <td><input type="text" v-model="row.thirdColumn" /></td>
                        <td><input type="text" v-model="row.fourthColumn" /></td>
                        <td><input type="text" v-model="row.fifthColumn" /></td>
                        <td><input type="text" v-model="row.sixthColumn" /></td>
                        <td><input type="text" v-model="row.seventhColumn" /></td>
                        <td><input type="text" v-model="row.eighthColumn" /></td>
                        <td><input type="text" v-model="row.ninthColumn" /></td>
                        <td><input type="text" v-model="row.tenthColumn" /></td>
                        <td><input type="text" v-model="row.eleventhColumn" /></td>
                        <td><input type="text" v-model="row.twelfthColumn" /></td>
                    </tr>
                </tbody>
            </v-table>
        </v-row>
    </v-container>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        default: () => ({}),
        required: true,
    }
});

let tab = ref("0");

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());

const tableData = ref([
    { firstColumn: 'Data 1', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 2', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 3', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 4', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 5', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 6', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 7', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 8', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 9', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 10', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 11', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
    { firstColumn: 'Data 12', secondColumn: '', thirdColumn: '', fourthColumn: '', fifthColumn: '', sixthColumn: '', seventhColumn: '', eighthColumn: '', ninthColumn: '', tenthColumn: '', eleventhColumn: '', twelfthColumn: '' },
]);

const emptyColumns = ref(new Array(11).fill(''));

const emits = defineEmits(['close-dialog'])
const payload = ref({});

const onSubmit = () => {
    alert('PhilHealth Claim 3');
    payload.value = {};
    emits('close-dialog');
    tab.value = '0';
}
</script>

<style scoped>
.sub-header {
    font-weight: bold; 
    font-style: italic; 
    text-decoration: underline;
}
.form-col {
    margin-top: -16px !important;
}
</style>