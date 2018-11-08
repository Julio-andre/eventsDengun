import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    Linking
} from 'react-native';
import uuid from 'uiid';

import Icon from 'react-native-vector-icons/FontAwesome';

const Article= (props) => {
    state = {
        image: null,
        uploading: false,
      };
    

    const articleImage = () => (
        <View style={{position:'relative'}}>
            <Image
                resizeMode={"cover"}
                style={styles.articleImage}
                source={{uri:image}}
            />
            <Text style={styles.priceTag}>
                € {props.ArticleData.price}
            </Text>
        </View>
    )

    const maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
      };
    
    const maybeRenderImage = () => {
        let { image } = this.state;
        if (!image) {
          return;
        }
    }

    const articleText = () => (
        <View>
            <Text
                onPress={this._copyToClipboard}
                onLongPress={this._share}
                style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                {image}
            </Text>
            <Text style={styles.articleTitle}>
                {props.ArticleData.title}
            </Text>
            <Text style={styles.articleDescription}>
                {props.ArticleData.description}
            </Text>
            <Text style={styles.articleDescription}>
                {props.ArticleData.location}
            </Text>
        </View>
    )

    const ownerNfo = () => (
        <View style={styles.ownerNfo}> 
            <Text>Contact the owner of this article to the following mail:</Text>
       
            <Icon.Button
                name="envelope-o"
                color="#00ADA9"
                backgroundColor="#ffffff"
                onPress={()=> openEmail()}
            >
                <Text
                    style={{fontSize:20}}
                >{props.ArticleData.email}</Text>
            </Icon.Button>
        </View>
    )

    const openEmail = () => {
        Linking.openURL(`mailto://${props.ArticleData.email}
        &subject=Regarding ${props.ArticleData.title}`)
    }

    const share = () => {
        Share.share({
          message: this.state.image,
          title: 'Check out this photo',
          url: this.state.image,
        });
      };

    const copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
      };

    const pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };
    
    const handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadUrl = await uploadImageAsync(pickerResult.uri);
            this.setState({ image: uploadUrl });
          }
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };

    const uploadImageAsync = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref()
          .child(uuid.v4());
      
        const snapshot = await ref.put(blob);
        return snapshot.downloadURL;
    };
    return (
        <ScrollView style={styles.articleContainer}>
            {articleImage()}
            {maybeRenderUploadingOverlay()}
            {maybeRenderImage()}
            {articleText()}
            {ownerNfo()}
            {copyToClipboard()}
            {share()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    articleContainer: {
        padding:10
    },
    articleImage:{
        width:'100%',
        height: 250
    },
    priceTag:{
        position:'absolute',
        bottom:0,
        backgroundColor: '#FF6444',
        padding:10,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black',
    },
    articleTitle:{
        fontSize: 30,
        color: '#474143',
        fontFamily: 'Roboto-Black',
        marginTop: 20,
    },
    articleDescription:{
        marginTop: 20,
        fontSize: 18,
    },
    ownerNfo: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth:1,
        borderTopColor:'lightgrey'
    }

 })

export default Article;