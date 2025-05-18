import { ClientSetting } from "@/types";
import { create } from "zustand";

interface SettingState {
  setting: ClientSetting;
  setSetting: (newSetting: ClientSetting) => void;
}

const useSettingStore = create<SettingState>((set, get) => ({
  setting: {} as ClientSetting,
  setSetting: (newSetting: ClientSetting) => {
    const currentSetting = get().setting;
    set({
      setting: {
        ...currentSetting,
        ...newSetting,
      },
    });
  },
}));

export default useSettingStore;
