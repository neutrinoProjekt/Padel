import React from 'react'
import { StyleSheet, Text } from 'react-native'
import {ListItem} from 'react-native-elements'

const MatchListItem = ({owner, participants}) => {
    return (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>
                    Match Created By: {owner.name}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default MatchListItem

const styles = StyleSheet.create({
    
})
