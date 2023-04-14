import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';
import './App.css'

const BarcodeScanner = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: scannerRef.current
      },
      decoder: {
        readers: ['ean_reader']
      }
    }, (err) => {
        if (err) {
            console.log('Entonces hay un erro bb');
            return
        }
        Quagga.start();
    });

    Quagga.onDetected((data) => {
      handleBarcode(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  const handleBarcode = (scanned_barcode) => {
    console.log(scanned_barcode);
    document.querySelector('#last-barcode').innerHTML = scanned_barcode;
  };

  return (
    <div className='container'>
      <div className='content'>
        <h2>Escaneador</h2>
        <div className='scanner' ref={scannerRef}></div>
          <div className='code'>
            <strong>Codigo escaneado:</strong>
            <div id="last-barcode"></div>
          </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;