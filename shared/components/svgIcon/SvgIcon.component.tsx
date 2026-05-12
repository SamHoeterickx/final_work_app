import React from 'react';
import { SvgProps } from 'react-native-svg';

// Machines
import Chemex from '@/assets/icons/machines/chemex.svg';
import CoffeeShop from '@/assets/icons/machines/coffee_shop.svg';
import CupMachine from '@/assets/icons/machines/cup_machine.svg';
import EspressoMachine from '@/assets/icons/machines/espresso_machine.svg';
import FilterCoffee from '@/assets/icons/machines/filter_coffee.svg';
import FrenchPress from '@/assets/icons/machines/french_press.svg';
import FullAutomatic from '@/assets/icons/machines/full_automatic_machine.svg';
import MokaPot from '@/assets/icons/machines/moka_pot.svg';
import PourOver from '@/assets/icons/machines/pour_over.svg';

// Gear
import BeanMil from '@/assets/icons/gear/bean_mill.svg';
import Gooseneck from '@/assets/icons/gear/gooseneck_kettle.svg';
import MilkFoamer from '@/assets/icons/gear/milk_foamer.svg';

// Beans
import Bean1 from '@/assets/icons/beans/1_bean.svg';
import Bean2 from '@/assets/icons/beans/2_beans.svg';
import Bean3 from '@/assets/icons/beans/3_beans.svg';
import Bean4 from '@/assets/icons/beans/4_beans.svg';

// LOCKS
import Locked from '@/assets/icons/locked.svg';
import Unlocked from '@/assets/icons/unlocked.svg';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';

// ARROWS
import ArrowLeftFull from '@/assets/icons/arrowLeftFull.svg';

// NAVIGATION
import Account from '@/assets/icons/navigation/account.svg';
import Chapters from '@/assets/icons/navigation/chapters.svg';
import Home from '@/assets/icons/navigation/home.svg';
import Settings from '@/assets/icons/navigation/settings.svg';
import Notifications from '@/assets/icons/navigation/notifications.svg'

// SETTINGS
import Legal from '@/assets/icons/settings/legal.svg'
import Privacy from '@/assets/icons/settings/privacy.svg'
import Info from '@/assets/icons/info.svg'

interface SvgIconProps extends SvgProps {
    name: ESvgIconName | string;
    color?: string;
}

const IconMap: Record<string, React.FC<SvgProps>> = {
    // Machines
    [ESvgIconName.FILTER_COFFEE]: FilterCoffee,
    [ESvgIconName.FULL_AUTOMATIC]: FullAutomatic,
    [ESvgIconName.ESPRESSO_MACHINE]: EspressoMachine,
    [ESvgIconName.CUP_MACHINE]: CupMachine,
    [ESvgIconName.FRENCH_PRESS]: FrenchPress,
    [ESvgIconName.COFFEE_SHOP]: CoffeeShop,
    [ESvgIconName.MOKA_POT]: MokaPot,
    [ESvgIconName.POUR_OVER]: PourOver,
    [ESvgIconName.CHEMEX]: Chemex,

    // Gear
    [ESvgIconName.BEAN_MILL]: BeanMil,
    [ESvgIconName.MILK_FOAMER]: MilkFoamer,
    [ESvgIconName.GOOSENECK_KETTLE]: Gooseneck,

    // Beans
    [ESvgIconName.BEAN_1]: Bean1,
    [ESvgIconName.BEAN_2]: Bean2,
    [ESvgIconName.BEAN_3]: Bean3,
    [ESvgIconName.BEAN_4]: Bean4,

    // LOCKS
    [ESvgIconName.LOCKED]: Locked,
    [ESvgIconName.UNLOCKED]: Unlocked,
    [ESvgIconName.ARROW_LEFT_FULL]: ArrowLeftFull,

    // NAVIGATION
    [ESvgIconName.HOME]: Home,
    [ESvgIconName.ACCOUNT]: Account,
    [ESvgIconName.CHAPTERS]: Chapters,
    [ESvgIconName.NOTIFICATIONS]: Notifications,
    [ESvgIconName.SETTINGS]: Settings,


    // SETTINGS
    [ESvgIconName.LEGAL]: Legal,
    [ESvgIconName.PRIVACY]: Privacy,
    [ESvgIconName.INFO]: Info,
};

export const SvgIcon: React.FC<SvgIconProps> = ({ name, color, ...props }) => {
    const IconComponent = IconMap[name];
    return IconComponent ? <IconComponent {...props} color={color} /> : null;
};
