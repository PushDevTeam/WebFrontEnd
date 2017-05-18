import {IAudioUrlMap} from './audio-urlmap.interface';

export interface IPandoraSong {
    'artistName': string,
    'songName': string,
    'albumArtUrl': string,
    'audioUrlMap': IAudioUrlMap,
    'allowFeedback': boolean,
    'songRating': number,
    'albumName'?: string
}