//import RNFetchBlob from "react-native-fetch-blob";
import { AsyncStorage } from 'react-native';


export default class Tools {
    static getCatHeader(catCode) {
        switch (catCode) {
            case 1:
                return 'اجتماعي';
                break;
            case 2:
                return 'اقتصادي';
                break;
            case 3:
                return 'سياسي';
                break;
            case 4:
                return 'ورزشي';
                break;
            case 5:
                return 'علمي';
                break;
            case 6:
                return 'فرهنگي';
                break;
            case 7:
                return 'ادب و هنر';
                break;
            case 8:
                return 'بين‌الملل';
                break;
            case 9:
                return 'حوادث';
                break;
            case 10:
                return 'سلامت';
                break;
            case 11:
                return 'اسرار خانه داری';
                break;
            case 12:
                return 'دنیای مد';
                break;
            case 20:
                return 'سرگرمی';
                break;
            case 14:
                return 'روانشناسی';
                break;
            case 19:
                return 'سبک زندگی';
                break;
            case 16:
                return 'آشپزی';
                break;
            case 17:
                return 'مذهبی';
                break;
            case 18:
                return 'گردشگری';
                break;

            default:
                break;
        }
    }

    static removeSpecialChars(strText) {
        if(strText == undefined) return undefined
        strText = strText.split('&zwnj;').join('')
        strText = strText.split('&bdquo;').join('')
        strText = strText.split('&rdquo;').join('')
        strText = strText.split('&ldquo;').join('')
        strText = strText.split('&rsquo;').join('')
        strText = strText.split('&sbquo;').join('')
        strText = strText.split('&lsquo;').join('')
        strText = strText.split('&zwj;').join('')
        strText = strText.split('&nbsp;').join('')
        strText = strText.split('&laquo;').join('')
        strText = strText.split('&raquo;').join('')
        strText = strText.split('&quot;').join('')
        strText = strText.split('&lrm;').join('')

        while (strText.indexOf("  ") > 0) {
            strText = strText.replace("  ", " ")
        }
        return strText.trim();
    }

    GenParagraph(FullStory) {
        try {
            var DotPos = 0;
            var SavedDotPos = 0;
            var Result = "";
            var Index = 0;
            var ParagraphLen = 300;
            var LoopCounter = 0;

            while (Index < FullStory.length && LoopCounter < 100) {

                SavedDotPos = DotPos;
                if (Index + ParagraphLen < FullStory.length)
                    DotPos = FullStory.indexOf(".", Index + ParagraphLen);
                else
                    DotPos = 0;
                if (DotPos > 0) {
                    Result = Result + FullStory.substr(Index, DotPos - Index) + "." + "\n\n";
                    Index = DotPos + 1;
                }
                else {
                    Result = Result + FullStory.substr(SavedDotPos, FullStory.length - SavedDotPos - 1) + "\n\n";
                    Index = FullStory.length;
                }
                LoopCounter++;
            }

            return Result;
        }
        catch (err) {
            console.log(err);

            return '';
        }


    }

    _storeData = async (keyName, tagNewsCodes) => {
        try {
            await AsyncStorage.setItem(keyName, tagNewsCodes);
        } catch (error) {
            // Error saving data
        }
    };



    tagClickHandler = () => {
        console.log('clicked');
        this._retrieveData('key1');
    };

    convertImageUrlToBase64(ImageUrl) {
        // const fs = RNFetchBlob.fs;
        // let imagePath = null;
        // RNFetchBlob.config({
        //     fileCache: true
        // })
        //     .fetch("GET", ImageUrl)
        //     // the image is now dowloaded to device's storage
        //     .then(resp => {
        //         // the image path you can use it directly with Image component
        //         imagePath = resp.path();
        //         return resp.readFile("base64");
        //     })
        //     .then(base64Data => {
        //         // here's base64 encoded image
        //         //console.log(base64Data);
        //         // remove the file from storage
        //         fs.unlink(imagePath);
        //         //return JSON.stringify(base64Data);
        //         console.log(base64Data);
        //         return base64Data;
        //     });
    }
}
