<template>
  <v-container>
      <v-card elevation="4" rounded="lg">
        <v-toolbar color="#FFF">
          <v-toolbar-title style="font-size: large; text-align: center"
            >Build File and HIS Templates Manager</v-toolbar-title
          >
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="searchQuery"
                variant="outlined"
                label="Search Build File Template"
                required
                clearable
                hide-details
                prepend-icon="mdi-refresh"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col
              v-for="(template, index) in filteredItems"
              :key="index"
              cols="4"
              xl="3"
              sm="6"
              md="6"
              lg="6"
              class="pa-1"
            >
              <template v-for="(template_item, index) in template.child" :key="index">
                <template v-if="template_item.table_and_template.length > 0">
                  <v-card class="ma-1">
                    <v-list density="compact" class="ma-1">
                      <v-card-title><div style="font-weight:bold; color:#117dad !important;">{{ template_item.label }}</div></v-card-title>
                      <v-divider></v-divider>
                        <v-list-item v-for="(item, index) in filteredTableAndTemplate(template_item.table_and_template)" :key="index" @click="computeTableAndTemplate(item.form)">
                          <p style="font-size: large; font-weight: 500" > {{ item.label }} </p>
                           <!-- <template v-slot:prepend>
                            <v-btn class="mr-2 pa-1" size="medium" color="#6984FF" :icon="item.icon"></v-btn>
                            </template> -->
                          <!-- <v-btn color="#6984FF" @click="handleOpenTemplate">Open Template</v-btn> -->
                        </v-list-item>
                    </v-list>
                  </v-card>
                </template>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script setup>
import navigationMenu from "~/constants/navigation-menu";

const items = navigationMenu;

const emits = defineEmits(["search"]);

const searchQuery = ref("");
// const filteredTemplates = ref(templates.value)


const handleRefresh = () => {
  searchQuery.value = ''
}

const handleOpenTemplate = () => {
  alert("Open Template");
};

const computeTableAndTemplate = (dialog,type)=>{
    if(dialog){
      useTableAndTemplate(dialog)
    }
}

const filteredItems = computed(() => {
    if (!searchQuery.value) {
      return items;
    }
    const query = searchQuery.value.toLowerCase();
    return items.filter(item => containsLabel(item, query));
  });

  const containsLabel =(obj, query) => {

    if (obj.label.toLowerCase().includes(query)) {
      return true;
    }

    if (obj.child) {
      // Check child labels
      if (obj.child.some(child => child.label.toLowerCase().includes(query))) {
        return true;
      }
      // Check table_and_template labels
      if (obj.child.some(child => child.table_and_template.some(t => t.label.toLowerCase().includes(query)))) {
        return true;
      }
      // Recursively check children
      return obj.child.some(child => containsLabel(child, query));
    }
    return false;
  }

  const filteredTableAndTemplate = (table_and_template) => {
    if (!searchQuery.value) {
      return table_and_template;
    }
    const query = searchQuery.value.toLowerCase();
    return table_and_template.filter(item => item.label.toLowerCase().includes(query));
  };
  
</script>

<style scoped></style>
