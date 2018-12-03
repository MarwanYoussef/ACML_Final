import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/dashboard',
    home: true
  },
  {
    title: 'What\'s cooking',
    icon: 'fa fa-shopping-basket',
    link: '/dashboard/items'
  },
  {
    title: 'Auth',
    icon: 'fa fa-lock	',
    children: [{
      title: 'Login',
      icon: 'fa fa-sign-in',
      link: '/dashboard/authelogin',
    },
    {
      title: 'Sign up',
      icon: 'fa fa-user-plus',
      link: '/dashboard/auth/register',
    }]
}
];
