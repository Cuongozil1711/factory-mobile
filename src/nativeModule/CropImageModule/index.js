import CropImage from './CropImage';
export const CropImageToText = async (uri, responseCropImage) => {
  try {
    //console.log('CropImageToText: ' + uri);
    let result = '';
    await CropImage.textRecognizer(
      uri,
      msgError => {
        //console.log('msgError: ' + msgError);
      },
      resultSuccess => {
        result = resultSuccess;
        responseCropImage(result);
      },
    );
    return result;
  } catch (error) {
    //console.log('CropImageToText: ', error);
    return 'No CropImageToText';
  }
};
