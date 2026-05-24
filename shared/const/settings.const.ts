import { ESvgIconName } from '../types/enums';
import { ISettingTabProps } from '../types/types';

export const SETTINGS_OPTIONS: ISettingTabProps[] = [
    {
        icon: ESvgIconName.LANGUAGE,
        copy: 'settings.tabs.changeLanguage',
        path: 'changeLanguage',
    },
    {
        icon: ESvgIconName.ACCOUNT,
        copy: 'settings.tabs.profile',
        path: 'profile',
    },
    {
        icon: ESvgIconName.NOTIFICATIONS,
        copy: 'settings.tabs.notifications',
        path: 'notifications',
    },
    {
        icon: ESvgIconName.INFO,
        copy: 'settings.tabs.about',
        path: 'about',
    },
    {
        icon: ESvgIconName.PRIVACY,
        copy: 'settings.tabs.privacyPolicy',
        path: 'privacyPolicy',
    },
    {
        icon: ESvgIconName.LEGAL,
        copy: 'settings.tabs.termsOfCondition',
        path: 'termsOfCondition',
    },
];

export const PROFILE_SETTINGS_OPTIONS: ISettingTabProps[] = [
    {
        copy: 'settings.profile.tabs.changePassword',
        path: 'changePassword',
    },
    {
        copy: 'settings.profile.tabs.changeEmail',
        path: 'changeEmail',
    },
    {
        copy: 'settings.profile.tabs.changeName',
        path: 'changeName',
    },
];

export const VIBRATION_PATTERN = [0, 100, 100, 250];
