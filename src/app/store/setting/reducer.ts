// Library Imports
import { createReducer, on } from '@ngrx/store';
import { cloneDeep, forEach } from 'lodash';

// Store Functions Imports
import { app_name, theme_scheme_direction, theme_scheme, theme_color, theme_font_size, page_layout, sidebar_color, sidebar_type, sidebar_menu_style} from './actions';
import { reset_state, update_setting } from '../../store/setting/actions';
import { initialState, defaultState } from './state';

// Model Imports
import { SettingState } from '../../model/setting.model'

// Dom Value Update Functions
import { updateBodyClass, updateHtmlClass, updateHtmlAttr, updateTitle, updateColorRootVar, updateStorage, updateDomValueBySetting, getStorage } from '../../utilities/setting'

const DefaultSetting = defaultState.setting

const createSettingObj = (state: SettingState) => {
  return {
    saveLocal: state.saveLocal,
    storeKey: state.storeKey,
    setting: cloneDeep(state.setting)
  }
}

const returnState = (state: any, setting: any): SettingState => {
  return { ...state, setting }
}

const Choices = {
    SchemeChoice: DefaultSetting.theme_scheme.choices,
    ColorChoice: DefaultSetting.theme_color.choices,
    FSChoice: DefaultSetting.theme_font_size.choices,
}


export const SettingReducer = createReducer(
  initialState,
  on(update_setting, (orignalState: SettingState): SettingState => {
    const state = createSettingObj(orignalState)
    const json = getStorage(state.storeKey);
      if (json === 'none') state.saveLocal = 'none'
      if(json !== null && json !== 'none') {
        state.saveLocal = json.saveLocal
        state.setting = json.setting
      }
      updateDomValueBySetting(state.setting, Choices)
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state))
    return state
  }),
  on(reset_state, (orignalState: SettingState): SettingState => {
    const state = createSettingObj(defaultState)
    updateDomValueBySetting(state.setting, Choices)
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(state))
    return state
  }),
  on(app_name, (state: SettingState, { value }) => {
    const setting = cloneDeep(state.setting)
    setting.app_name.value = value
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(theme_scheme_direction, (state: SettingState, { value }) => {
    const setting = cloneDeep(state.setting)
    setting.theme_scheme_direction.value = value
    updateHtmlAttr({prop: 'dir',  value: setting.theme_scheme_direction.value})
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(theme_scheme, (state: SettingState, { value }): SettingState => {
    const setting = cloneDeep(state.setting)
    setting.theme_scheme.value = value
    updateBodyClass(Choices.SchemeChoice, setting.theme_scheme.value)
    updateColorRootVar(setting.theme_scheme.value, setting.theme_color, Choices.ColorChoice)
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(theme_color, (state: SettingState, { colors }): SettingState => {
    const setting = cloneDeep(state.setting)
    forEach(colors, (value, key) => {
      setting.theme_color.colors[key] = value
    })
    setting.theme_color.value = colors.value
    updateColorRootVar(state.setting.theme_scheme.value, setting.theme_color, Choices.ColorChoice)
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(theme_font_size, (state: SettingState, { value }): SettingState => {
    const setting = cloneDeep(state.setting)
    setting.theme_font_size.value = value
    updateHtmlClass(Choices.FSChoice, setting.theme_font_size.value)
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(page_layout, (state: SettingState, { value }): SettingState => {
    const setting = cloneDeep(state.setting)
    setting.page_layout.value = value
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(sidebar_color, (state: SettingState, { value }): SettingState => {
    const setting = cloneDeep(state.setting)
    setting.sidebar_color.value = value
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(sidebar_type, (state: SettingState, { value }): SettingState => {
    const setting = cloneDeep(state.setting)
    setting.sidebar_type.value = value
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  }),
  on(sidebar_menu_style, (state: SettingState, { value }): SettingState => {
    const setting = cloneDeep(state.setting)
    setting.sidebar_menu_style.value = value
    updateStorage(state.saveLocal, state.storeKey, createSettingObj(returnState(state, setting)))
    return returnState(state, setting)
  })
);
