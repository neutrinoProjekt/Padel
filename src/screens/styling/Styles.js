import {StyleSheet} from 'react-native';

// Main style-map
export const styles = StyleSheet.create({
    input: {
        textAlign: 'center',
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 14,
        paddingLeft: 15,
        width: 305,
        alignSelf: 'center',
    },
    narrowInput: {
        textAlign: 'center',
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 14,
        paddingLeft: 15,
        width: 145,
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#696969',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#696969',
        alignSelf: 'center',
        textAlign: 'center',
    },
    absolute: {
        position: 'absolute',
    },
    button: {
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#00CEB4',
        width: 305,
        borderRadius: 10,
    },
    paragraph: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#696969',
        width: 300,
        alignSelf: 'center',
        textAlign: 'center',
    },
    error: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff0f0f',
        padding: 10,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    titleAlignment: {
        paddingTop: 100,
        alignSelf: 'center',
    },
    progressbar: {
        alignSelf: 'center',
        height: 15,
        width: '15%',
        backgroundColor: '#f7f7f7',
        borderColor: '#707070',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: '3%',
    },
});
