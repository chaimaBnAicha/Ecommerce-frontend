import { Component, OnInit } from '@angular/core';
import { isArray } from 'lodash';

@Component({
  selector: 'iq-horizontal-nav',
  templateUrl: './horizontal-nav.component.html'
})
export class HorizontalNavComponent implements OnInit {

  menuOptions: any[] = [
    {
      active: true,
      name: 'Home',
      icon: 'home',
      children: [
        { name: 'Dashboard', route: { name: 'default.dashboard' } },
        { name: 'Analytics', route: { name: 'analytics.dashboard' } },
        { name: 'E-Commerce', route: { name: 'e-commerce.dashboard' } },
        { name: 'Crypto', route: { name: 'crypto.dashboard' } },
        {
          name: 'Menu Style',
          children: [
            { name: 'Horizontal', route: { name: 'horizontal.dashboard' } },
            { name: 'Dual Horizontal', route: { name: 'dual-horizontal.dashboard' } },
            { name: 'Dual Compact', route: { name: 'dual-compact.dashboard' } },
            { name: 'Boxed Horizontal', route: { name: 'boxed.dashboard' } },
            { name: 'Boxed Fancy', route: { name: 'boxed-fancy.dashboard' } }
          ]
        },
        // { name: 'E-Commerce', route: { name: 'e-commerce.dashboard' } },
        // { name: 'Social App', route: { name: 'social-app.dashboard' } },
        // { name: 'Blog', route: { name: 'blog.dashboard' } },
        // { name: 'Appointment', route: { name: 'appointment.dashboard' } },
        // { name: 'File Manager', route: { name: 'file-manager.dashboard' } },
        // { name: 'Chat', route: { name: 'chat.chat-dashboard' } },
        // { name: 'Mail', route: { name: 'mail.mail-dashboard' } }
      ]
    },
    {
      name: 'Pages',
      icon: 'document',
      children: [
        {
          name: 'Spacial page',
          children: [
            { name: 'Billing', route: { name: 'default.billing' } },
            { name: 'Calender', route: { name: 'default.calender' } },
            { name: 'Kanban', route: { name: 'default.kanban' } },
            { name: 'Pricing', route: { name: 'default.pricing' } },
            { name: 'Timeline', route: { name: 'default.timeline' } }
          ]
        },
        {
          name: 'Auth Skins',
          children: [
            {
              name: 'Default',
              children: [
                { name: 'Sign In', route: { name: 'auth.login' } },
                { name: 'Sign Up', route: { name: 'auth.register' } },
                { name: 'Email Varify', route: { name: 'auth.varify-email' } },
                { name: 'Reset Password', route: { name: 'auth.reset-password' } },
                { name: 'Lock Screen', route: { name: 'auth.lock-screen' } }
              ]
            },
            {
              name: 'Animated',
              children: [
                { name: 'Sign In', route: { name: 'animated.auth.login' } },
                { name: 'Sign Up', route: { name: 'animated.auth.register' } },
                { name: 'Email Varify', route: { name: 'animated.auth.varify-email' } },
                { name: 'Reset Password', route: { name: 'animated.auth.reset-password' } },
                { name: 'Lock Screen', route: { name: 'animated.auth.lock-screen' } },
                { name: 'Two Factor', route: { name: 'animated.auth.two-factor' } },
                { name: 'Account Deactivate', route: { name: 'animated.auth.account-deactivated' } }
              ]
            },
            {
              name: 'Popup',
              children: [
                { name: 'Sign In', type: 'modal', route: 'signIn' },
                { name: 'Sign Up', type: 'modal', route: 'signUp' }
              ]
            },
            {
              name: 'Simple',
              children: [
                { name: 'Sign In', route: { name: 'simple.auth.login' } },
                { name: 'Sign Up', route: { name: 'simple.auth.register' } }
              ]
            }
          ]
        },
        {
          name: 'User',
          children: [
            { name: 'User Profile', route: { name: 'default.user-profile' } },
            { name: 'User Add', route: { name: 'default.user-add' } },
            { name: 'User List', route: { name: 'default.user-list' } }
          ]
        },
        {
          name: 'Utilities',
          children: [
            { name: '404', route: { name: 'errors.404' } },
            { name: '500', route: { name: 'errors.500' } },
            { name: 'Maintenance', route: { name: 'errors.maintenance' } }
          ]
        }
      ]
    },
    {
      name: 'Elements',
      icon: 'bookmark',
      children: [
        {
          name: 'Ui-Elements',
          children: [
            { name: 'Avatars', route: { name: 'default.avatars' } },
            { name: 'Alert', route: { name: 'default.alert' } },
            { name: 'Badges', route: { name: 'default.badges' } },
            { name: 'Breadcrumb', route: { name: 'default.breadcrumb' } },
            { name: 'Buttons', route: { name: 'default.buttons' } },
            { name: 'ButtonsGroup', route: { name: 'default.buttonsGroup' } },
            { name: 'Offcanvas', route: { name: 'default.offcanvas' } },
            { name: 'Colors', route: { name: 'default.colors' } },
            { name: 'Cards', route: { name: 'default.cards' } },
            { name: 'Carousel', route: { name: 'default.carousel' } }
          ]
        },
        {
          name: 'Widgets',
          children: [
            { name: 'Widget Basic', route: { name: 'default.widget-basic' } },
            { name: 'Widget Chart', route: { name: 'default.widget-chart' } },
            { name: 'Widget Card', route: { name: 'default.widget-card' } }
          ]
        },
        {
          name: 'Map',
          children: [
            { name: 'Google', route: { name: 'default.map-google' } }
            // { name: 'Vector', route: { name: 'default.map-vector' } }
          ]
        },
        {
          name: 'Form',
          children: [
            { name: 'Element', route: { name: 'default.elements' } },
            { name: 'Wizard', route: { name: 'default.wizard' } },
            { name: 'Validation', route: { name: 'default.validation' } }
          ]
        },
        {
          name: 'Table',
          children: [
            { name: 'Bootstrap Table', route: { name: 'default.bootstrap-table' } },
            { name: 'Border Table', route: { name: 'default.border-table' } },
            { name: 'Fancy Table', route: { name: 'default.fancy-table' } },
            { name: 'Fixed Table', route: { name: 'default.fixed-table' } }
          ]
        },
        {
          name: 'Icons',
          children: [
            { name: 'Solid', route: { name: 'default.icons.solid' } },
            { name: 'Outlined', route: { name: 'default.icons.outlined' } },
            { name: 'Dual Tone', route: { name: 'default.icons.dual-tone' } }
          ]
        }
      ]
    }
  ]  
  constructor() { }

  ngOnInit(): void {
  }

  checkArrLength(arr: any): boolean {
    if (isArray(arr)) {
      return true
    }
    return false
  
  }

}
