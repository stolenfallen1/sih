// export const useKeyboardEscToClose = (action: () => void) => {
//   const handleKeyEvent = (event: KeyboardEvent) => {
//     if (event.key === 'Escape') {
//       action();
//       event.stopPropagation();
//     }
//   }

//   onMounted(() => {
//     document.addEventListener('keydown', handleKeyEvent);
//   })
//   onUnmounted(() => {
//     document.removeEventListener('keydown', handleKeyEvent);
//   })
// }