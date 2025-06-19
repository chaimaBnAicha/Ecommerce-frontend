// Interfaces for typecasting
import { SettingState } from '../model/setting.model'
import { SettingReducer } from './setting/reducer'
export interface AppState {
  settingObject: SettingState
}

export const StoreState = {
  settingObject: SettingReducer
}
