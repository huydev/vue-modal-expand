import { defineComponent } from "vue";
import { VueModalProvider } from "vue-modal-expand";
import { TheTest } from "@/components/TheTest";

const App = defineComponent({
  name: "App",
  setup: () => {
    return () => (
      <VueModalProvider>
        <TheTest />
      </VueModalProvider>
    );
  },
});

export default App;
