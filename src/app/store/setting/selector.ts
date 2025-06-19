import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const appNameSelector = createSelector(
  (state: AppState) => state.settingObject.setting.app_name.value,
  (value) => value
);
export const themeSchemeDirectionSelector = createSelector(
  (state: AppState) => state.settingObject.setting.theme_scheme_direction.value,
  (value) => value
);
export const themeSchemeSelector = createSelector(
  (state: AppState) => state.settingObject.setting.theme_scheme.value,
  (value) => value
);
export const themeColorSelector = createSelector(
  (state: AppState) => state.settingObject.setting.theme_color,
  (value) => value
);
export const themeFontSizeSelector = createSelector(
  (state: AppState) => state.settingObject.setting.theme_font_size.value,
  (value) => value
);
export const pageLayoutSelector = createSelector(
  (state: AppState) => state.settingObject.setting.page_layout.value,
  (value) => value
);
export const sidebarColorSelector = createSelector(
  (state: AppState) => state.settingObject.setting.sidebar_color.value,
  (value) => value
);
export const sidebarTypeSelector = createSelector(
  (state: AppState) => state.settingObject.setting.sidebar_type.value,
  (value) => value
);
export const sidebarMenuStyleSelector = createSelector(
  (state: AppState) => state.settingObject.setting.sidebar_menu_style.value,
  (value) => value
);