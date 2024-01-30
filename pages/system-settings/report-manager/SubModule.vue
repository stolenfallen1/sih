<template>
    <v-card>
        <v-card-title> System User Group Sub Modules </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-table density="compact">
                <thead>
                    <tr>
                        <th width="4">Select</th>
                        <!-- <th width="4"></th> -->
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
                        <tr v-for="item in tabData.data" :key="tabData.id">
                            <td>
                                <v-checkbox
                                    v-model="item.select"
                                    hide-details
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const emits = defineEmits();

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

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped></style>
