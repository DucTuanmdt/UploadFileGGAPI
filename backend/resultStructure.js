{ config:
   { url:
      'https://www.googleapis.com/upload/drive/v3/files?fields=id&uploadType=multipart',
     method: 'POST',
     paramsSerializer: [Function],
     data:
      PassThrough {
        _readableState: [ReadableState],
        readable: false,
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _writableState: [WritableState],
        writable: false,
        allowHalfOpen: true,
        _transformState: [Object],
        _flush: [Function: flush] },
     headers:
      { 'Content-Type':
         'multipart/related; boundary=870d45db-c3d0-436e-95c3-dd3183f568f4',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
        Authorization:
         'Bearer ya29.c.ElnHBgo8lhNtXMW0_SORhPFw-VCRE6tyXidkJvYKzUz8Bejm4Jk5iVRj-Ps1aCshqRf5uT7dLqVXv8HR9weubZskF70hXlRczpr-adFqjTtbhNP09AGtyXZOhg',
        Accept: 'application/json' },
     params: { fields: 'id', uploadType: 'multipart' },
     validateStatus: [Function],
     body:
      PassThrough {
        _readableState: [ReadableState],
        readable: false,
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _writableState: [WritableState],
        writable: false,
        allowHalfOpen: true,
        _transformState: [Object],
        _flush: [Function: flush] },
     responseType: 'json' },
  data: { id: '11Hk0oe193AtB3kd5CKAcUqPdHMoYNJVZ' },
  headers:
   { 'alt-svc': 'quic=":443"; ma=2592000; v="46,44,43,39"',
     'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
     connection: 'close',
     'content-length': '47',
     'content-type': 'application/json; charset=UTF-8',
     date: 'Sat, 09 Mar 2019 15:11:56 GMT',
     expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
     pragma: 'no-cache',
     server: 'UploadServer',
     vary: 'Origin, X-Origin',
     'x-guploader-uploadid':
      'AEnB2UoEzQDU5ac-WL004k8r617sBT_v8jakWhYv5vkvpiUluDX8K1gsh26UvKIgWM3AUB37irkRzxJweoWCGpdsX33WSznpuSzUaj36bdFqiNxUdmXRgEs' },
  status: 200,
  statusText: 'OK' }