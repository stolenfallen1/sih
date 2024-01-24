import { emits } from "./ReusableTable.vue";

export function refetch(options) {
emits('fetchPage', options);
}
