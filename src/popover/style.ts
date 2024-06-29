import { Dimensions, StyleSheet } from 'react-native';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const RATIO = 0.85;

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    topEmptyView: {
        width: '100%',
        height: WINDOW_HEIGHT * (1 - RATIO), // 上面的空白区域
    },
    modalView: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: WINDOW_HEIGHT * RATIO,
    },
});
