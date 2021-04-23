import {StyleSheet} from 'react-native';

// Main style-map
export const styles = StyleSheet.create({
    input: {
        marginTop: 30,
        textAlign: 'center',
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 20,
        paddingLeft: 15,
        width: 305,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#696969',
        marginTop: 60,
        alignSelf: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#696969',
        marginTop: 30,
        alignSelf: 'center',
        textAlign: 'center',
    },
    button: {
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#00CEB4',
        height: 40,
        width: 305,
        borderRadius: 10,
    },
    paragraph: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#696969',
        marginTop: 30,
        width: 300,
        alignSelf: 'center',
        textAlign: 'center',
    },
    error: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff0f0f',
        width: 320,
        position: 'absolute',
        padding: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});
