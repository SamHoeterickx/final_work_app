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

interface SvgIconProps extends SvgProps {
    name: string;
}

const IconMap: Record<string, React.FC<SvgProps>> = {
    // Machines
    'filter_coffee.svg': FilterCoffee,
    'full_automatic_machine.svg': FullAutomatic,
    'espresso_machine.svg': EspressoMachine,
    'cup_machine.svg': CupMachine,
    'french_press.svg': FrenchPress,
    'coffee_shop.svg': CoffeeShop,
    'moka_pot.svg': MokaPot,
    'pour_over.svg': PourOver,
    'chemex.svg': Chemex,

    // Gear
    'bean_mil.svg': BeanMil,
    'milk_foamer.svg': MilkFoamer,
    'gooseneck_kettle.svg': Gooseneck,

    // Beans
    '1_bean.svg': Bean1,
    '2_beans.svg': Bean2,
    '3_beans.svg': Bean3,
    '4_beans.svg': Bean4,
};

export const SvgIcon: React.FC<SvgIconProps> = ({ name, ...props }) => {
    const IconComponent = IconMap[name];
    return IconComponent ? <IconComponent {...props} /> : null;
};
