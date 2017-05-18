import {IAudioUrl} from './audio-url.interface';
export interface IAudioUrlMap {
    'mediumQuality': IAudioUrl,
    'highQuality'?: IAudioUrl,
    'lowQuality'?: IAudioUrl
}