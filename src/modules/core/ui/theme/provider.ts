import { createContextStore } from "@lib/utils/create-context";
import type { ThemeState } from "./app-theme-store";

export const {
    Context: ThemeStoreContext,
    Provider: ThemeStoreProvider,
    useStore: useThemeStore,
    useOptionalStore: useOptionalThemeStore
} = createContextStore<{ state: ThemeState; dispatch: Dispatch<ThemeAction> }>('ThemeStore');