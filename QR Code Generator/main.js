document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text');
    const sizeSelect = document.getElementById('size');
    const colorSelect = document.getElementById('color');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrcodeDiv = document.getElementById('qrcode');
    const inputError = document.getElementById('input-error');
    
    let qrcode = null;
    
    generateBtn.addEventListener('click', generateQRCode);
    clearBtn.addEventListener('click', clearAll);
    downloadBtn.addEventListener('click', downloadQRCode);
    
    function generateQRCode() {
        const text = textInput.value.trim();
        const size = parseInt(sizeSelect.value);
        const color = colorSelect.value;
        
        if (!text) {
            inputError.textContent = 'Please enter some text or URL';
            return;
        } else {
            inputError.textContent = '';
        }
        
        qrcodeDiv.innerHTML = '';
        
        qrcode = new QRCode(qrcodeDiv, {
            text: text,
            width: size,
            height: size,
            colorDark: color,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        
    
        downloadBtn.style.display = 'block';
    }
    
    function clearAll() {
        textInput.value = '';
        qrcodeDiv.innerHTML = '';
        downloadBtn.style.display = 'none';
        inputError.textContent = '';
    }
    
    function downloadQRCode() {
        const qrImage = qrcodeDiv.querySelector('img');
        if (qrImage) {
            const link = document.createElement('a');
            link.href = qrImage.src;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
});