import React, { useEffect, useRef, ElementType } from "react";
import { TouchableOpacity, Animated, ViewStyle } from "react-native";
import { styles, RATIO, WINDOW_HEIGHT } from './style'

const ANIMATION_DURATION = 250; // 动画执行时间

interface IProps {
    bgViewStyle?: ViewStyle;
    contentViewStyle?: ViewStyle;
	showAnimationComplete: () => void;
    dismissAnimationComplete: () => void;
    children: ElementType | any;
}

/**
 * 弹窗组件
 * @param params 参数
 * @returns 组件
 */
export const Popover = (props: IProps) => {
	//--------------------------------------------------------------------
	// 弹出动画
	const beginValue = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
	const showAnimation = () => {
		Animated.timing(beginValue, {
			toValue: WINDOW_HEIGHT * (1 - RATIO),
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start(() => {
			props.showAnimationComplete?.();
		});
	};
	const dismissAnimation = () => {
		Animated.timing(beginValue, {
			toValue: WINDOW_HEIGHT,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start();
	};

	//--------------------------------------------------------------------
	// 背景渐变动画
	const fadeBeginValue = useRef(new Animated.Value(0)).current;
	const fadeAnimation = () => {
		Animated.timing(fadeBeginValue, {
			toValue: 1,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start();
	};
	const resetFadeAnimation = () => {
		Animated.timing(fadeBeginValue, {
			toValue: 0,
			duration: ANIMATION_DURATION,
			delay: ANIMATION_DURATION / 3, //等内容视图快消失的时候再让背景消失
			useNativeDriver: true,
        }).start(() => {
            props.dismissAnimationComplete?.();
        });
	};

	//--------------------------------------------------------------------
	// 打开页面时执行动画
	useEffect(() => {
		fadeAnimation();
		showAnimation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const closeAction = () => {
		dismissAnimation();
		resetFadeAnimation();
	};

	return (
		<Animated.View
			style={[
                styles.container,
                props.bgViewStyle,
				{
					opacity: fadeBeginValue,
				},
			]}
		>
			<TouchableOpacity
				style={styles.topEmptyView}
				activeOpacity={1}
				onPress={() => {
					closeAction();
				}}
			/>
			<Animated.View
				style={[
                    styles.modalView,
                    props.contentViewStyle,
					{
						transform: [
							{
								translateY: beginValue,
							},
						],
					},
				]}
            >
                props.children
            </Animated.View>
		</Animated.View>
	);
};
