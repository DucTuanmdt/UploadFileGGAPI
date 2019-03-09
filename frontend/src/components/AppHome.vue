<template>
  <v-container grid-list-md text-xs-center fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="#FAFAFA" class="black--text" elevation="0">
          <v-card-text class="px-0 display-1">Chọn file để upload lên google drive</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 text-xs-center>
        <v-card dark color="#FAFAFA" class="black--text" elevation="0">
          <v-card-text v-if="isEnableUpload">File đã chọn: {{ fileUpload.name }} </v-card-text>
        </v-card>

          <v-btn @click="chooseFile" color="teal" class="white--text">Chọn file
            <v-icon right dark>folder</v-icon>
          </v-btn>
          <input type="file" @change="onFileChanged" ref="inputUploadImage" id="imgupload" style="display:none" />
          <v-btn @click="uploadFileToGoogleDrive" class="info" :disabled="!isEnableUpload">Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card dark color="#FAFAFA" class="black--text" elevation="0">
          <template v-if="isUploading">
            <v-card-text class="title">
              Đang tải lên...
            </v-card-text>
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </template>
          <template v-else-if="isUploaded">
            <v-card-text class="px-0">
              <v-alert v-if="isUploadSuccess" :value="true" color="success" icon="check_circle" outline class="title">
                Upload file thành công!
                <a :href="linkFile" target="_blank">
                  <v-btn color="success">Mở file</v-btn>
                </a>
              </v-alert>
              <v-alert v-else :value="true" color="error" icon="warning" outline class="title">
                Đã có lỗi xảy ra, Upload file không thành công!!!
              </v-alert>
            </v-card-text>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from "axios"
  export default {
    head: {
      title: "Upload file"
    },
    data: () => ({
      fileUpload: null,
      linkFile: "",
      isUploading: false,
      isUploaded: false,
      isUploadSuccess: false,
    }),
    methods: {
      chooseFile() {
        console.log(this.$refs.inputUploadImage)
        this.$refs.inputUploadImage.value = null;
        this.$refs.inputUploadImage.click();
      },
      onFileChanged(event) {
        if (event.target.files.length > 0) {
          console.log("OnFileChange", event.target.files)
          this.fileUpload = event.target.files[0];
        }
      },
      uploadFileToGoogleDrive() {
        this.isUploading = true;

        let formData = new FormData();
        const thisApp = this;
        formData.append('upfile', this.fileUpload);
        axios.post('http://localhost:3000/api/upload',
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((response) => {
            console.log("Success", response);
            thisApp.linkFile = response.data.url;
            thisApp.isUploadSuccess = false;
            if (response.data) {
              if (response.data.url) {
                thisApp.isUploadSuccess = true;
              }
            }
            thisApp.isUploading = false;
            thisApp.isUploaded = true;
          })
          .catch((error) => {
            console.log("Error", error);
            thisApp.isUploading = false;
            thisApp.isUploaded = true;
            thisApp.isUploadSuccess = false;
          });
        this.fileUpload = null;
      },
    },
    mounted() {},
    computed: {
      isEnableUpload() {
        return this.fileUpload != null;
      }
    }
  }
</script>

<style>

</style>