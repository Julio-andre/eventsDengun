import { StyleSheet, Text, View, Image, 
    ActivityIndicator, Clipboard, Share } from 'react-native';

export const maybeRenderUploadingOverlay = () => {
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

export const maybeRenderImage = () => {
    let { image } = this.state;
    
    if (!image) {
        return;
    }

    return (
        <View
            style={{
                marginTop: 30,
                width: 250,
                borderRadius: 3,
                elevation: 2,
            }}>
            <View
                style={{
                    borderTopRightRadius: 3,
                    borderTopLeftRadius: 3,
                    shadowColor: 'rgba(0,0,0,1)',
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 4, height: 4 },
                    shadowRadius: 5,
                    overflow: 'hidden',
                }}>
                    <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
            </View>

            <Text
                onPress={this.copyToClipboard}
                onLongPress={this.share}
                style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                {image}
            </Text>
        </View>
    );
};

export const share = () => {
    Share.share({
        message: this.state.image,
        title: 'Check out this photo',
        url: this.state.image,
    });
};

export const copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
};

export const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
};

export const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
};

export const handleImagePicked = async pickerResult => {
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


export async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());

    const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}