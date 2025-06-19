import { createAction, props } from '@ngrx/store';

// Setting Update Functions
export const app_name = createAction('[Setting] app_name', props<{ value: string }>());
export const theme_scheme_direction = createAction('[Setting] theme_scheme_direction', props<{ value: string }>());
export const theme_scheme = createAction('[Setting] theme_scheme',props<{ value: string }>());
export const theme_color = createAction('[Setting] theme_color', props<{colors: any, value: string}>());
export const theme_font_size = createAction('[Setting] theme_font_size', props<{ value: string}>());
export const page_layout = createAction('[Setting] page_layout', props<{ value: string}>());
export const sidebar_color = createAction('[Setting] sidebar_color', props<{ value: string}>());
export const sidebar_type = createAction('[Setting] sidebar_type', props<{ value: Array<string>}>());
export const sidebar_menu_style = createAction('[Setting] sidebar_menu_style', props<{ value: string}>());

// Setting Reset Functions
export const reset_state = createAction('[Setting] reset_state');

// Full Setting Update Functions
export const update_setting = createAction('[Setting] update_setting');