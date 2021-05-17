import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import UserListItem from './UserListItem'

const gestureRootViewStyle = { flex: 1 };

export default function TeamSelector({teamParticipants, setTeamParticipants, mode}) {
    //const [teamParticipants, setTeamParticipants] = React.useState([props.participants, [], []]);

    const DragUIComponent = ({ item, index }) => {
        return (
            <DraxView
                //style={[styles.centeredContent, styles.draggableBox, { backgroundColor: item.background_color }]}
                draggingStyle={styles.dragging}
                dragReleasedStyle={styles.dragging}
                hoverDraggingStyle={styles.hoverDragging}
                dragPayload={{index, team: item.team}}
                longPressDelay={150}
                key={index}
            >
                <UserListItem participant={item}/>
            </DraxView>
        );
    }

    const ReceivingZone = ({team, title}) => {
        return (
            <DraxView
                //style={ styles.listItemOne}
                receivingStyle={styles.receiving}
                renderContent={({ viewState }) => {
                    const receivingDrag = viewState && viewState.receivingDrag;
                    const payload = receivingDrag && receivingDrag.payload;
                    return (
                        <View>
                            <Text style={styles.headerStyle}> {title} </Text>
                            <DraxList
                            data={teamParticipants[team]}
                            renderItemContent={DragUIComponent}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={true}
                            />
                        </View>
                    );
                }}
                onReceiveDragDrop={(event) => {
                    // cannot be more than 2 people
                    console.log(mode);
                    if (teamParticipants[team].length > 1 && mode=='Double') return;
                    if (teamParticipants[team].length > 0 && mode=='Single') return;

                    // extract payload
                    const {team: originTeam, index: originIndex} = event.dragged.payload; 

                    // clone array
                    let newTeamParticipants = [...teamParticipants];
                    
                    // extract participant
                    let selected_participant = newTeamParticipants[originTeam].splice(originIndex, 1)[0];
                    
                    // change team
                    selected_participant.team = team;

                    // insert participant
                    newTeamParticipants[team].push(selected_participant);
                    
                    setTeamParticipants(newTeamParticipants);
                }}
            />
        );
    }

    const FlatListItemSeparator = () => {
        return (<View style={styles.itemSeparator} />);
    }

    return (
        <GestureHandlerRootView
            style={gestureRootViewStyle}>
            <DraxProvider>
                <View style={styles.container}>
                    <ReceivingZone team={0} title={'Players'}/>
                    <ReceivingZone team={1} title={'Team 1 Drop here!'}/>
                    <ReceivingZone team={2} title={'Team 2 Drop here!'}/>
                </View>
            </DraxProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create(
    {
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
    container: {
        flex: 1,
        padding: 12,
        paddingTop: 40,
        justifyContent: 'space-evenly',
    },
    centeredContent: {
        borderRadius: 10,
    },
    receivingZone: {
        height: (Dimensions.get('window').width / 4) - 12,
        borderRadius: 10,
        width: (Dimensions.get('window').width / 4) - 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    receiving: {
        borderColor: 'red',
        borderWidth: 2,
    },
    draggableBox: {
        width: (Dimensions.get('window').width / 4) - 12,
        height: (Dimensions.get('window').width / 4) - 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    dragging: {
        opacity: 0.2,
    },
    hoverDragging: {
        borderColor: 'magenta',
        borderWidth: 2,
    },
    receivingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    itemSeparator: {
        height: 15
    },
    draxListContainer: {
        padding: 5,
        height: 200
    },
    receivingZoneContainer: {
        padding: 5,
        height: 100
    },
    textStyle: {
        fontSize: 18
    },
    headerStyle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 20,
    }
});