import { GestureResponderEvent } from 'react-native';
import { IAccessibility, IBubbleTabConfig, TIconRenderer, TBubbleTabBarIcon } from './types';
import * as React from "react";
interface IBubbleTabParent extends Omit<IBubbleTabConfig, 'name' | 'activeIcon'>, IAccessibility {
}
export interface IBubbleTab extends IBubbleTabParent {
    iconRenderer: TIconRenderer;
    activeTabSize: number;
    disabledTabSize: number;
    tabName: string;
    icon: TBubbleTabBarIcon;
    isActive: boolean;
    testID?: string;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
}
declare const BubbleTab: React.FC<IBubbleTab>;
export default BubbleTab;
