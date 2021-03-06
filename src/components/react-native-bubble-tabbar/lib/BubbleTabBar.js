"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const native_1 = tslib_1.__importStar(require("styled-components/native"));
const BubbleTab_1 = tslib_1.__importDefault(require("./BubbleTab"));
const constants_1 = require("./constants");
import {Platform} from 'react-native';
import * as Haptics from 'expo-haptics';

const BubbleTabBar = ({ iconRenderer = constants_1.defaultIconRenderer, activeTabSize = constants_1.defaultActiveTabSize, disabledTabSize = constants_1.defaultDisabledTabSize, backgroundColor = constants_1.defaultBackgroundColor, tabs, style, state, descriptors, navigation, }) => {
    const tabRoutes = react_1.useMemo(() => {
        const { routes } = state;
        return routes.slice(0, 3);
    }, [state.routes]);
    return (react_1.default.createElement(BubbleTabBarContainer, { style: style, backgroundColor: backgroundColor }, tabRoutes.map(({ key: routeKey, name: routeName }, index) => {
        const currentTabConfig = tabs[index];
        const { name, activeColor, activeBackgroundColor, inactiveColor, activeIcon, disabledIcon, } = currentTabConfig;
        const { options } = descriptors[routeKey];
        const { tabBarLabel: optionTabBarLabel, title: optionTitle, tabBarAccessibilityLabel: accessibilityLabel, } = options;
        const tabName = react_1.useMemo(() => {
            return name || optionTabBarLabel || optionTitle || routeName;
        }, [name, optionTabBarLabel, optionTitle]);
        const isActive = state.index === index;
        const onPress = react_1.useCallback(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            const event = navigation.emit({
                type: 'tabPress',
                target: routeKey,
            });
            if (!isActive && !event.defaultPrevented) {
                navigation.navigate(routeName);
            }
        }, [routeKey, routeName, isActive]);
        const onLongPress = react_1.useCallback(() => {
            navigation.emit({
                type: 'tabLongPress',
                target: routeKey,
            });
        }, [routeKey]);
        const accessibilityState = { selected: isActive };
        const currentIcon = disabledIcon
            ? isActive
                ? activeIcon
                : disabledIcon
            : activeIcon;
        return (react_1.default.createElement(BubbleTab_1.default, { key: `tab-${tabName}`, iconRenderer: iconRenderer, activeTabSize: activeTabSize, disabledTabSize: disabledTabSize, isActive: isActive, icon: currentIcon, activeColor: activeColor, activeBackgroundColor: activeBackgroundColor, inactiveColor: inactiveColor, tabName: tabName, onPress: onPress, onLongPress: onLongPress, accessibilityRole: "button", accessibilityState: accessibilityState, accessibilityLabel: accessibilityLabel }));
    })));
};
exports.default = BubbleTabBar;
const BubbleTabBarContainer = native_1.default.View `
  flex-direction: row;
  height: ${Platform.OS === 'ios' ? '100px': '80px'};
  align-items: center;
  justify-content: center;
  padding: 0 50px;

  ${({ backgroundColor }) => backgroundColor &&
    native_1.css `
      background-color: ${backgroundColor};
    `};
`;
//# sourceMappingURL=BubbleTabBar.js.map