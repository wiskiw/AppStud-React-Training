

export default class UIUtils {

    /**
     * Safty take first image URL from Spotify images array or return placeholder url.
     */
    static getSpotifyImageUrl(images, placeholderUrl){
        const isImagesExist = typeof images !== 'undefined' && images.length > 0;
        return isImagesExist ? images[0].url : placeholderUrl;
    }

}
