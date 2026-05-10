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
import { ESvgIconName } from '../types/enums';

// ARROWS
import ArrowLeftFull from '@/assets/icons/arrowLeftFull.svg';

interface SvgIconProps extends SvgProps {
    name: ESvgIconName | string;
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
};

export const SvgIcon: React.FC<SvgIconProps> = ({ name, ...props }) => {
    const IconComponent = IconMap[name];
    return IconComponent ? <IconComponent {...props} /> : null;
};
