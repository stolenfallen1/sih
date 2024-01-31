<template>
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-card>
            <v-card-title> System User Group Modules </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-tabs v-model="tab" center-active>
                    <v-tab v-for="tab in tabs" :key="tab.id">
                        {{ tab.name }}
                    </v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item v-for="tab in tabs" :key="tab.id">
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th width="4">Select</th>
                                    <th width="4"></th>
                                    <th width="320">Module</th>
                                    <th>Read</th>
                                    <th>Edit</th>
                                    <th>Add</th>
                                    <th>Print</th>
                                    <th>Post</th>
                                    <th>Approved</th>
                                    <th>Void</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="tabData in tabs">
                                    <tr
                                        v-for="item in tabData.data"
                                        :key="tabData.id"
                                    >
                                        <td>
                                            <v-checkbox
                                                v-model="item.select"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-btn
                                                size="small"
                                                density="compact"
                                                color="#6984FF"
                                                icon="mdi-link-circle-outline"
                                                @click="openSubModule"
                                            ></v-btn>
                                        </td>
                                        <td>{{ item.module }}</td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.read"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.edit"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.add"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.print"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.post"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.approved"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                v-model="item.void"
                                                hide-details
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </v-table>
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="router.back()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="subdialog"
        persistent
        hide-overlay
        width="800"
        scrollable
    >
        <sub-module @close-dialog="closeSubModule"></sub-module>
    </v-dialog>
</template>

<script setup>
import SubModule from "./SubModule.vue";

definePageMeta({
    layout: "root-layout",
});

const router = useRouter();

const panel = ref([0]);
const dialog = ref(true);
const subdialog = ref(false);
let tab = ref("HIS");
const tabs = ref([
    {
        id: 1,
        name: "HIS",
        data: [
            {
                select: true,
                module: "Module 1",
                read: false,
                edit: false,
                add: true,
                print: false,
                post: true,
                approved: true,
                void: false,
            },
        ],
    },
    {
        id: 2,
        name: "BUILD_FILE",
        data: [
            {
                select: true,
                module: "Module 2",
                read: true,
                edit: false,
                add: true,
                print: false,
                post: true,
                approved: false,
                void: false,
            },
        ],
    },
    {
        id: 3,
        name: "MMIS",
        data: [
            {
                select: true,
                module: "Module 3",
                read: true,
                edit: true,
                add: true,
                print: false,
                post: true,
                approved: true,
                void: false,
            },
        ],
    },
    {
        id: 4,
        name: "POS",
        data: [
            {
                select: true,
                module: "Module 4",
                read: true,
                edit: false,
                add: true,
                print: false,
                post: true,
                approved: true,
                void: true,
            },
        ],
    },
    {
        id: 5,
        name: "ORSCHEDULES",
        data: [
            {
                select: true,
                module: "Module 5",
                read: true,
                edit: true,
                add: true,
                print: false,
                post: true,
                approved: true,
                void: false,
            },
        ],
    },
]);

const openSubModule = () => {
    subdialog.value = true;
};

const closeSubModule = () => {
    subdialog.value = false;
};
</script>

<style scoped></style>
