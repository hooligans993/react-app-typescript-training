import { Button, Upload, Icon, Modal } from 'antd';
import * as React from 'react';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import ImageCompressor from 'image-compressor.js';
interface UploadFile {
    uid: number;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    originFileObj: File;
    type: string;
    url?: string;
    thumbUrl?: string;
}

interface UploadChangeParam {
    file: UploadFile;
    fileList: Array<UploadFile>;
    event?: {
        percent: number;
    };
}

interface PicturesWallState {
    previewVisible: boolean;
    previewImage: string;
    fileList: Array<UploadFile>;
    compressedImages: Array<File>;
}
const initialState: PicturesWallState = { previewVisible: false, previewImage: '', fileList: [], compressedImages: [] };

const compressor = new ImageCompressor();

export default class PicturesWall extends React.Component<{}, PicturesWallState> {
    public state = initialState;

    public render() {
        const {previewVisible, previewImage, fileList, compressedImages} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Add image</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
                {fileList.length > 0 &&
                <div>
                    <Button onClick={this.compressImages} type="primary" icon="setting">
                        Compress
                    </Button>
                </div>
                }
                {compressedImages.length > 0 &&
                <div>
                    <Button onClick={this.convertToBase64} type="primary" icon="database">
                        Convert
                    </Button>
                </div>
                }
            </div>
        );
    }

    private handleCancel = () => this.setState({previewVisible: false});

    private handlePreview = (file: UploadFile) => {
        this.setState({
            previewImage: file.url || file.thumbUrl || '',
            previewVisible: true,
        });
    }

    private handleChange = (change: UploadChangeParam) => {
        const compressedImagesFiles: Array<File> = this.state.compressedImages;
        compressor.compress(change.file.originFileObj, getCompressConfig()).then((s: File) => {
            compressedImagesFiles.push(s);
            console.log('success compress', s);
         });
        this.setState({fileList: change.fileList, compressedImages: compressedImagesFiles});
    }

    private compressImages = () => {
        const compressedImagesFiles: Array<File> = this.state.compressedImages;
        // const compressor = new ImageCompressor();
        // this.state.fileList.map((file) => {
        //     const success = (compressedFile: File) => compressedImagesFiles.push(compressedFile);
        //     const error = (e: Error) => console.log('Error', e);
        //     if (file) {
        //         compressor.compress(file.originFileObj, getCompressConfig(success, error)).then((success) =>{
        //             this.setState({ compressedImages: compressedImagesFiles });
        //             console.log('success compress', success);
        //         });
        //     }
        // });

        console.log('comp', compressedImagesFiles);
        console.log('comp lenght', compressedImagesFiles.length);

    }

    private convertToBase64 = () => {
        const base64List: Array<string> = [];
        this.state.compressedImages.map((file) => {
            const success = (base64: string) => {
                base64List.push(base64);
                console.log('Bases', base64List);
            };
            const error = (e: Error) => console.log('Error convert', e);
            convertFileToBase64(file, success, error);
        });
    }
}

function getCompressConfig(): ImageCompressor.Options {
    return {
        quality: .6,
        maxWidth: 600,
        maxHeight: 600,
        // success (file: File) { successCallback(file); },
        // error (error: Error) { errorCallback(error); },
    };
}

function convertFileToBase64(file: File, successCallback: Function, errorCallback: Function): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => successCallback(reader.result);
    reader.onerror = (error: ProgressEvent) => errorCallback(error);
}
