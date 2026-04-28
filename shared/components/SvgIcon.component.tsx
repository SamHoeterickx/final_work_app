import React from 'react';
import { SvgProps } from 'react-native-svg';

// Machines
import Chemex from '@/assets/icons/machines/chemex.svg'
import CoffeeShop from '@/assets/icons/machines/coffee_shop.svg';
import CupMachine from '@/assets/icons/machines/cup_machine.svg';
import EspressoMachine from '@/assets/icons/machines/espresso_machine.svg';
import FilterCoffee from '@/assets/icons/machines/filter_coffee.svg';
import FrenchPress from '@/assets/icons/machines/french_press.svg';
import FullAutomatic from '@/assets/icons/machines/full_automatic_machine.svg';
import MokaPot from '@/assets/icons/machines/moka_pot.svg'
import PourOver from '@/assets/icons/machines/pour_over.svg';

// Gear
import BeanMil from '@/assets/icons/gear/bean_mill.svg';
import Gooseneck from '@/assets/icons/gear/gooseneck_kettle.svg';
import MilkFoamer from '@/assets/icons/gear/milk_foamer.svg'

// Beans
import Bean1 from '@/assets/icons/beans/1_bean.svg';
import Bean2 from '@/assets/icons/beans/2_beans.svg';
import Bean3 from '@/assets/icons/beans/3_beans.svg';
import Bean4 from '@/assets/icons/beans/4_beans.svg';


interface SvgIconProps extends SvgProps {
  name: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ name, ...props }) => {
  switch (name) {
    // Machines
    case 'filter_coffee.svg':
        return <FilterCoffee {...props} />;
    case 'full_automatic_machine.svg':
        return <FullAutomatic {...props} />;
    case 'espresso_machine.svg':
        return <EspressoMachine {...props} />;
    case 'cup_machine.svg':
        return <CupMachine {...props} />;
    case 'french_press.svg':
        return <FrenchPress {...props} />;
    case 'coffee_shop.svg':
        return <CoffeeShop {...props} />;
    case 'moka_pot.svg': 
        return <MokaPot {...props} />
    case 'pour_over.svg': 
        return <PourOver {...props} />
    case 'chemex.svg':
        return <Chemex {...props} />

    // Gear
    case 'bean_mil.svg':
        return <BeanMil {...props} />
    case 'milk_foamer.svg':
        return <MilkFoamer {...props} />
    case 'gooseneck_kettle.svg':
        return <Gooseneck {...props} />

    // Beans
    case '1_bean.svg':
        return <Bean1 {...props} />;
    case '2_beans.svg':
        return <Bean2 {...props} />;
    case '3_beans.svg':
        return <Bean3 {...props} />;
    case '4_beans.svg':
        return <Bean4 {...props} />;
    default:
      return null;
  }
};