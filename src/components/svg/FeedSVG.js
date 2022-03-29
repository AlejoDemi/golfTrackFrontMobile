import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';


const AnimatedPath = Animated.createAnimatedComponent(
    Path
) ;

Animated.addWhitelistedNativeProps({
    stroke: true,
});

const FeedSVG = ({ color, size }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <AnimatedPath
                d="M96 304h320M96 208h320M96 112h320M96 400h320"
                stroke={color}
                strokeWidth={2}
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default FeedSVG;
