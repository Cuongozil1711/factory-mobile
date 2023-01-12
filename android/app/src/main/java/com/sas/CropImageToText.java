package com.sas;


import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.SparseArray;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.vision.Frame;
import com.google.android.gms.vision.text.TextBlock;
import com.google.android.gms.vision.text.TextRecognizer;

import java.io.IOException;

public class CropImageToText extends ReactContextBaseJavaModule {
    private static ReactApplicationContext context;

    CropImageToText(ReactApplicationContext context){
        super(context);
        this.context = context;
    }

    @ReactMethod
    public void textRecognizer(String uriForFile, Callback errorCallback, Callback successCallback) throws IOException {
        TextRecognizer recognizer = null;
        Context context1 = getReactApplicationContext();
        String resultStr = "";
        Bitmap bitmap1 = MediaStore.Images.Media.getBitmap(context1.getContentResolver(), Uri.parse(uriForFile));
        try {
            if (null == recognizer) {
                recognizer = new TextRecognizer.Builder(context1.getApplicationContext()).build();
            }

            if (recognizer.isOperational()) {
                // bitmap.;
                Frame frame = new Frame.Builder().setBitmap(bitmap1).build();

                final SparseArray<TextBlock> items = recognizer.detect(frame);
                if (items.size() != 0) {
                    StringBuilder stringBuilder = new StringBuilder();
                    for (int i = 0; i < items.size(); i++) {
                        TextBlock item = items.valueAt(i);
                        String textItem = item.getValue().trim();
                        if(textItem.length() > 0){
                            stringBuilder.append(textItem);
                        }
                    }
                    resultStr = stringBuilder.toString();
                }
            }
        } catch (Exception e) {
            Toast.makeText(context1, e.getMessage(), Toast.LENGTH_SHORT).show();
            errorCallback.invoke(e.getMessage());
            e.printStackTrace();
        }
        successCallback.invoke(resultStr);
    }

    @NonNull
    @Override
    public String getName() {
        return "CropImageToText";
    }
}
