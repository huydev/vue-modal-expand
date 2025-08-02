import { defineComponent } from "vue";
import { VtsModalProvider } from "vue-modal-expand";
import { TheTest } from "@/components/TheTest";

const App = defineComponent({
  name: "App",
  setup: () => {
    return () => (
      <VtsModalProvider>
        <TheTest />
      </VtsModalProvider>
    );
  },
});

export default App;
