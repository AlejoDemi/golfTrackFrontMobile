"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_animation_hooks_1 = require("react-native-animation-hooks");
const native_1 = tslib_1.__importStar(require("styled-components/native"));
const BubbleTab = ({ iconRenderer, activeTabSize, disabledTabSize, tabName, icon, activeColor, inactiveColor = '#e0e0e0', activeBackgroundColor, isActive, onPress, onLongPress, accessibilityRole, accessibilityLabel, accessibilityState, testID, }) => {
    const [isOpenAnimation, setIsOpenAnimation] = react_1.useState(isActive);
    const tabWidth = react_native_animation_hooks_1.useAnimation({
        type: 'timing',
        initialValue: isActive ? activeTabSize : disabledTabSize,
        toValue: isOpenAnimation ? activeTabSize : 75,
        duration: 300,
        useNativeDriver: false,
    });
    const labelOpacity = react_native_animation_hooks_1.useAnimation({
        type: 'timing',
        initialValue: isActive ? 1 : 0,
        toValue: isOpenAnimation ? 1 : 0,
        duration: isOpenAnimation ? 150 : 100,
        delay: isOpenAnimation ? 150 : 0,
        useNativeDriver: true,
    });
    react_1.useEffect(() => setIsOpenAnimation(isActive), [isActive]);
    const color = isActive ? activeColor : inactiveColor;
    const backgroundColor = isActive ? activeBackgroundColor : 'transparent';
    const renderedIcon = iconRenderer({ icon, color });
    return (react_1.default.createElement(TouchableBubbleTabContainer, { onPress: onPress, onLongPress: onLongPress, accessibilityRole: accessibilityRole, accessibilityState: accessibilityState, accessibilityLabel: accessibilityLabel, testID: testID },
        react_1.default.createElement(AnimatedBubbleTabWrapper, { backgroundColor: backgroundColor, style: { width: tabWidth } },
            renderedIcon,
            isActive && (react_1.default.createElement(BubbleTabLabel, { numberOfLines: 1, color: color, style: { opacity: labelOpacity } }, tabName)))));
};
exports.default = BubbleTab;
const TouchableBubbleTabContainer = native_1.default.TouchableOpacity `
  justify-content: center;
  align-items: center;
`;
const AnimatedBubbleTabWrapper = native_1.default(react_native_1.Animated.View) `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 12px;
  border-radius: 30px;

  ${({ backgroundColor }) => backgroundColor &&
    native_1.css `
      background-color: ${backgroundColor};
    `};
`;
const BubbleTabLabel = native_1.default(react_native_1.Animated.Text) `
  margin-left: 15px;
  font-size: 20px;
  width: auto;
  height: auto;
  font-weight: bold;

  ${({ color }) => color &&
    native_1.css `
      color: ${color};
    `};
`;
//# sourceMappingURL=BubbleTab.js.map