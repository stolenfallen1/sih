<template>
  <v-container>
    <form @submit.prevent="handleSearch">
      <v-card elevation="4" rounded="lg">
        <v-toolbar color="#FFF">
          <v-toolbar-title style="font-size: large; text-align: center;">Build File Manager</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model="searchQuery"
                variant="outlined"
                label="Search Build File Template"
                required
                clearable
                hide-details
                prepend-icon="mdi-refresh"
                @click:prepend="handleRefresh"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn class="bg-primary text-white" type="submit">Search</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col 
              v-for="(template, index) in items" :key="index"
              cols="12" sm="6" md="4" lg="3"
              >
                <v-card elevation="4" v-for="(template_item, index) in template.child" :key="index">
                  <template v-for="(item, index) in template_item.table_and_template" :key="index">
                    <v-card-text style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                      <p style="font-size: large; font-weight: 500; font-style: italic; margin-bottom: 20px;">
                        {{  item.label }}
                      </p>
                      <v-btn color="#6984FF" @click="handleOpenTemplate">Open Template</v-btn>
                    </v-card-text>
                  </template>
                </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </form>
  </v-container>
</template>

<script setup>
import navigationMenu from '~/constants/navigation-menu';

const items = navigationMenu

const emits = defineEmits(['search'])

const searchQuery = ref('')
// const filteredTemplates = ref(templates.value)

const handleSearch = () => {
  // items.value = items.value.filter(template => template.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
}

// const handleRefresh = () => {
//   searchQuery.value = ''
//   filteredTemplates.value = templates.value
// }

const handleOpenTemplate = () => {
  alert("Open Template")
}

</script>

<style scoped>
</style>