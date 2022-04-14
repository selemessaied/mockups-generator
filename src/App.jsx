import './App.css';
import { useForm } from 'react-hook-form';
import { functions } from './utils/firebase';
import { httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import domtoimage from 'dom-to-image';
import { connectFunctionsEmulator } from 'firebase/functions';
import { saveAs } from 'file-saver'
connectFunctionsEmulator(functions, 'localhost', 5001);

function App() {
  const iphoneWidth = 175;
  const macbookHeight = 500;
  const ipadWidth = 350;
  const [customToken, setCustomToken] = useState('');
  const [errorToken, setError] = useState('');
  const [images, setImages] = useState({
    ipad: '',
    iphone: '',
    imac: '',
    macbook: ''
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => onClick2(data);

  const onClick2 = async (data) => {
    setError('');
    setCustomToken('');
    const getToken = httpsCallable(functions, 'getScreenShot');
    getToken({
      url: data.url,
      iphone: data.iphone,
      ipad: data.ipad,
      imac: data.imac,
      macbook: data.macbook
    })
      .then((result) => {
        setImages(result.data.images);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <form
        className="flex flex-col justify-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="URL"
          className="p-2 w-48 self-center rounded-md  border border-gray-700"
          type="text"
          {...register('url')}
        />

        <label>
          <input type="checkbox" {...register('iphone')} />
          iPhone
        </label>

        <label>
          <input type="checkbox" {...register('macbook')} />
          MacBook
        </label>

        <label>
          <input type="checkbox" {...register('imac')} />
          iMac
        </label>

        <label>
          <input type="checkbox" {...register('ipad')} />
          iPad
        </label>

        <button
          type="submit"
          className="w-36 self-center rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200"
          onSubmit={onSubmit}
        >
          Get Token
        </button>
        <button
          className="w-36 self-center rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200"
          onClick={download}
        >
          download
        </button>
      </form>
      <div className="flex flex-col justify-center gap-4 p-5">
        <div>{customToken}</div>
        <div className="text-red-500">{errorToken}</div>
      </div>
      <div id='my-node' className="container">
        <div className="bg">
          {images.macbook && (
            <div className="container-macbook">
              <img
                className="macbook-screen"
                style={{
                  height: macbookHeight * 0.865 + 'px',
                  paddingBottom: macbookHeight * 0.0667 + 'px'
                }}
                src={images.macbook}
                alt=""
              />

              <img
                className="macbook-mokup"
                style={{ height: macbookHeight + 'px' }}
                src="assets/images/macbook.png"
                alt=""
              />
            </div>
          )}
          {images.iphone && (
            <div className="container-iphone">
              <img
                style={{
                  width: iphoneWidth * 0.9 + 'px'
                }}
                src="assets/images/iphone-header.png"
                alt=""
              />
              <img
                className="iphone-screen"
                style={{
                  width: iphoneWidth * 0.9 + 'px'
                }}
                src={images.iphone}
                alt=""
              />

              <img
                className="iphone-mokup"
                style={{ width: iphoneWidth + 'px' }}
                src="assets/images/iphone.png"
                alt=""
              />
            </div>
          )}
          {images.ipad && (
            <div className="container-ipad">
              <img
                style={{
                  width: ipadWidth * 0.92 + 'px'
                }}
                src={images.ipad}
                alt=""
              />

              <img
                className="ipad-mokup"
                style={{ width: ipadWidth + 'px' }}
                src="assets/images/ipad.png"
                alt=""
              />
            </div>
          )}
          {images.imac && (
            <div>
              <img src={images.imac} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const download = () => {
  domtoimage.toBlob(document.getElementById('my-node'))
  .then(function (blob) {
      saveAs(blob, 'my-node.png');
  });
};

export default App;
