import { FC } from 'react';

// COMPONENTS
import { AboutBrewlingo } from './AboutBrewlingo.component';
import { ChangeEmailSettings } from './ChangeEmailSettings.component';
import { ChangeLanguageSettings } from './ChangeLanguageSettings.component';
import { ChangeNameSettings } from './ChangeNameSettings.component';
import { ChangePasswordSettings } from './ChangePasswordSettings.component';
import { NotificationSettings } from './NotificationSettings.component';
import { PrivacyPolicy } from './PrivacyPolicy.component';
import { ProfileSettings } from './ProfileSettings.component';
import { TermsOfCondition } from './TermsOfCondition.component';

// TYPES
import { ESettingsOptions } from '@/shared/types/enums';
import { ISettingsOptionsWrapperProps } from '@/shared/types/types';

export const SettingsOptionsWrapper: FC<ISettingsOptionsWrapperProps> = ({ option }) => {
    console.log(option);
    switch (option) {
        case ESettingsOptions.PROFILE:
            return <ProfileSettings />;
        case ESettingsOptions.CHANGE_LANGUAGE:
            return <ChangeLanguageSettings />;
        case ESettingsOptions.NOTIFICATIONS:
            return <NotificationSettings />;
        case ESettingsOptions.ABOUT:
            return <AboutBrewlingo />;
        case ESettingsOptions.PRIVACY_POLICY:
            return <PrivacyPolicy />;
        case ESettingsOptions.TERMS_OF_CONDITION:
            return <TermsOfCondition />;
        case ESettingsOptions.CHANGE_EMAIL:
            return <ChangeEmailSettings />;
        case ESettingsOptions.CHANGE_NAME:
            return <ChangeNameSettings />;
        case ESettingsOptions.CHANGE_PASSWORD:
            return <ChangePasswordSettings />;
    }
};
